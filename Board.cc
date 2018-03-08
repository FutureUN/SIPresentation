#include<bits/stdc++.h>
typedef long long ll;
using namespace std;
const int R = 4, C = 4;
int boardObj[4][4] = { 1,2,3,4,
                    5,6,7,8,
                    9,10,11,12,
                    13,14,15,0
                    };
int dx[]={0,1,0,-1};
int dy[]={1,0,-1,0};

const int NumberSteps = 15;
const int ExecPerSearch = 30;
void printBoard(int bo[4][4])
{
    cout << "------------------------\n";
    for(int i = 0 ; i < 4 ; i ++ )
    {
        for ( int j = 0 ; j < 4; j ++ )
        {
            cout << bo[i][j] << " \n"[j==3];
        }
    }
    cout << "------------------------\n";
}
bool is_in(int x,int y)
{
    return x>=0 && x < R && y >= 0 && y < C;
}
void shuffleBoard(int board[4][4], int &x,int &y, int steps)
{
    steps = NumberSteps;
    int last =  -1;

    for ( int  i = 0 ; i < steps ; i ++ )
    {

        while (true)
        {
			int dir = rand()%4;
         	if(dir == last )
					continue;
            int nx = x + dx[dir];
            int ny = y + dy[dir];
            if( is_in(nx,ny))
            {
                last = (dir+2)%4;
                swap(board[x][y],board[nx][ny]);
                x = nx, y = ny;
                break;
            }
        }
    }
}
struct node
{
    int board[4][4];
    int xEsp, yEsp;
    int cost;
    int heuris;
    node(){}
    node(int _board[4][4], int xEsp, int yEsp, int cost):xEsp(xEsp),yEsp(yEsp),cost(cost){
        for(int i = 0 ; i < 4 ; i ++ )
        {
            for(int j = 0 ; j < 4 ; j ++ )
            {
                board[i][j] = _board[i][j];
            }
        }
        heuris =0;
    }
    node(int _board[4][4], int xEsp, int yEsp, int cost, int heuris):xEsp(xEsp),yEsp(yEsp),cost(cost),heuris(heuris){
        for(int i = 0 ; i < 4 ; i ++ )
        {
            for(int j = 0 ; j < 4 ; j ++ )
            {
                board[i][j] = _board[i][j];
            }
        }
    }
    bool operator< (const node& n) const {    // sobrecarga operador <
        return ((heuris > n.heuris));
    }
    void manhattanHeuristic()
    {
        int ans = 0;
        for ( int  i = 0 ; i < 4 ; i ++ )
        {
            for ( int j = 0 ; j < 4 ; j ++ )
            {
                if(board[i][j] == 0)
                    continue;
                int xSh = (board[i][j]-1) / 4;
                int ySh = (board[i][j]-1) % 4;
                ans += abs(xSh - i) + abs(ySh - j);
            }
        }
        heuris = cost + ans;
    }
    void rabonHeuristic()
    {
        int ans = 0;
        for ( int  i = 0 ; i < 4 ; i ++ )
        {
            for ( int j = 0 ; j < 4 ; j ++ )
            {
                if(board[i][j] == 0 )
                    continue;
                if(board[i][j] != boardObj[i][j])
                    ans++;
            }
        }
        heuris = cost + ans;
    }
};
ll boardToMask(int board[4][4])
{
    ll mask = 0;
    for ( int i = 0 ; i < 16 ; i ++ )
    {
        int num = board[i/4][i%4];
        for(int j = 0 ; j < 4 ; j++ )
        {
             if( num & (1<<j))
                 mask |= (1LL<<(i*4+j));
        }
    }
    return mask;
}
void copyBoard(int ori[4][4], int cp[4][4])
{
    for(int i = 0; i < R ; i ++ )
    {
        for (int j = 0 ; j < C ; j ++ )
        {
            cp[i][j] = ori[i][j];
        }
    }
}
void maskToMat(ll mask, int bo[4][4])
{
    for(int i = 0 ; i < 16 ; i ++ )
    {
        int num = 0;
        for ( int j = 0 ; j < 4 ; j ++ )
            if( mask & ( 1LL<<(i*4+j) ))
                num|= (1 << (j));
        bo[i/4][i%4] = num;
    }
}
pair<int,ll> solveUsingBFS(bool printPath)
{
    ll numInserts = 1;
    int xEsp, yEsp;
    xEsp = yEsp = 3;
    int board[4][4];
    copyBoard(boardObj,board);
    shuffleBoard(board,xEsp, yEsp,15);
    if (printPath)
    {
        cout << "board to solve: \n";
        printBoard(board);
    }
    map<ll, ll > parent;
    queue<node> q;
    q.push(node(board,xEsp,yEsp,0));
    parent[boardToMask(board)] = 1;
    int ans = -1;
    ll obj = boardToMask(boardObj);
    while(!q.empty())
    {
        node head = q.front();
        q.pop();
        if(obj == boardToMask(head.board))
        {
            ans = head.cost;
            break;
        }
        for(int  i = 0 ; i < 4 ; i ++ )
        {
            int nx = head.xEsp + dx[i];
            int ny = head.yEsp + dy[i];
            if(!is_in(nx,ny))
                continue;
            int boardTmp[R][C];
            copyBoard(head.board,boardTmp);
            swap(boardTmp[head.xEsp][head.yEsp],boardTmp[nx][ny]);
            long long mask = boardToMask(boardTmp);
            if(parent[mask] != 0)
                continue;
            parent[mask] = boardToMask(head.board);
            q.push(node(boardTmp,nx,ny,head.cost+1));
            numInserts++;
        }
    }
    if (printPath)
    {
        vector<long long> path ;
        long long aux = boardToMask(boardObj);
        while(parent[aux]!=1)
        {
            path.push_back(aux);
            aux = parent[aux];
        }
        for(int i = path.size()-1;i >= 0 ; i-- )
        {
            int tmp[4][4];
            maskToMat(path[i],tmp);
            printBoard(tmp);
        }
    }
    return {ans,numInserts};
}

pair<int,ll> solveUsingAstarMan(bool printPath)
{
    ll numInserts =1;
    int xEsp, yEsp;
    xEsp = yEsp = 3;
    int board[4][4];
    copyBoard(boardObj,board);
    shuffleBoard(board,xEsp, yEsp,15);
    if (printPath)
    {
        cout << "board to solve: \n";
        printBoard(board);
    }
    map<ll, ll > parent;
    map<ll, bool > visited;
    priority_queue<node> q;
    node tmp(board,xEsp,yEsp,0);
    tmp.manhattanHeuristic();
    q.push(tmp);
    parent[boardToMask(tmp.board)] = 1;
    int ans = -1;
    ll obj = boardToMask(boardObj);
    while(!q.empty())
    {
        node head = q.top();
        q.pop();
 //       printBoard( head.board);
        if(obj == boardToMask(head.board))
        {
            ans = head.cost;
            break;
        }
        visited[boardToMask(head.board)]=true;

        for(int  i = 0 ; i < 4 ; i ++ )
        {
            int nx = head.xEsp + dx[i];
            int ny = head.yEsp + dy[i];
            if(!is_in(nx,ny))
                continue;
            int boardTmp[R][C];
            copyBoard(head.board,boardTmp);
            swap(boardTmp[head.xEsp][head.yEsp],boardTmp[nx][ny]);
            long long mask = boardToMask(boardTmp);
            if(visited[mask])
                continue;
            node tmp(boardTmp,nx,ny,head.cost+1);
            tmp.manhattanHeuristic();
            parent[mask] = boardToMask(head.board);
            q.push(tmp);
            numInserts++;
        }
    }
    if(printPath)
    {
        vector<long long> path ;

        long long aux = boardToMask(boardObj);
        while(parent[aux]!=1)
        {
            path.push_back(aux);
            aux = parent[aux];
        }
        for(int i = path.size()-1;i >= 0 ; i-- )
        {
            int tmp[4][4];
            maskToMat(path[i],tmp);
            printBoard(tmp);
        }
    }
    return {ans,numInserts};

}

pair<int,ll> solveUsingAstarRab(bool printPath)
{
    ll numInserts = 0;
    int xEsp, yEsp;
    xEsp = yEsp = 3;
    int board[4][4];
    copyBoard(boardObj,board);
    shuffleBoard(board,xEsp, yEsp,15);
    if (printPath)
    {
        cout << "board to solve: \n";
        printBoard(board);
    }
    map<ll, ll > parent;
    map<ll, bool > visited;
    priority_queue<node> q;
    node tmp(board,xEsp,yEsp,0);
    tmp.rabonHeuristic();
    q.push(tmp);
    parent[boardToMask(tmp.board)] = 1;
    int ans = -1;
    ll obj = boardToMask(boardObj);
    while(!q.empty())
    {
        node head = q.top();
        q.pop();
      //  printBoard( head.board);
        if(obj == boardToMask(head.board))
        {
            ans = head.cost;
            break;
        }
        visited[boardToMask(head.board)]=true;

        for(int  i = 0 ; i < 4 ; i ++ )
        {
            int nx = head.xEsp + dx[i];
            int ny = head.yEsp + dy[i];
            if(!is_in(nx,ny))
                continue;
            int boardTmp[R][C];
            copyBoard(head.board,boardTmp);
            swap(boardTmp[head.xEsp][head.yEsp],boardTmp[nx][ny]);
            long long mask = boardToMask(boardTmp);
            if(visited[mask])
                continue;
            node tmp(boardTmp,nx,ny,head.cost+1);
            tmp.rabonHeuristic();
            parent[mask] = boardToMask(head.board);
            q.push(tmp);
            numInserts++;
        }
    }
    if (printPath )
    {
        vector<long long> path ;
        long long aux = boardToMask(boardObj);
        while(parent[aux]!=1)
        {
            path.push_back(aux);
            aux = parent[aux];
        }
        for(int i = path.size()-1;i >= 0 ; i-- )
        {
            int tmp[4][4];
            maskToMat(path[i],tmp);
            printBoard(tmp);
        }
    }
    return {ans,numInserts};
}

map < ll , bool > visited ;
int ansDf = -1;
ll numRecursiveCalls = 0;
void DFS(node cur, int depth)
{
   numRecursiveCalls++;
    if(ansDf != -1)
        return;

    if (boardToMask(cur.board) == boardToMask(boardObj))
    {
        ansDf = cur.cost;
        return;
    }
    if (depth == 0 )
        return;
    for ( int i = 0 ; i < 4 ; i ++ )
    {
        int nx = cur.xEsp + dx[i];
        int ny = cur.yEsp + dy[i];
        if(!is_in(nx,ny))
            continue;

        int boardTmp[R][C];
        copyBoard(cur.board,boardTmp);
        swap(boardTmp[cur.xEsp][cur.yEsp],boardTmp[nx][ny]);
        long long mask = boardToMask(boardTmp);
        if(visited[mask])
            continue;
        visited[mask] = true;
        node tmp (boardTmp,nx,ny,cur.cost+1);
        DFS(tmp,depth-1);
        visited[mask] = false;
    }
}
pair<int,ll> solveUsingDFS(int depth,ll maskBoard)
{
    int board[4][4];
    maskToMat(maskBoard,board);
    int xEsp = 0;
    int yEsp = 0;
    for(int i = 0 ; i< 4; i ++ )
    {
        for(int j = 0 ; j< 4 ; j ++ )
        {
            if(board[i][j] == 0)
            {
                xEsp = i;
                yEsp = j;
                break;
            }
        }
    }
    ansDf = -1;
    numRecursiveCalls =0;
    visited.clear();
    node tmp(board,xEsp,yEsp,0);
    visited[boardToMask(tmp.board)]  = true;
    DFS(tmp,depth);
    visited[boardToMask(tmp.board)] = false;
    return {ansDf,numRecursiveCalls};

}
pair<int,ll> IIDFS()
{

    ll numInserts =0;
    int xEsp, yEsp;
    xEsp = yEsp = 3;
    int board[4][4];
    copyBoard(boardObj,board);
    shuffleBoard(board,xEsp, yEsp,15);
    ll maskBoard = boardToMask(board);

    for (int i = 0 ; i < 100 ; i ++ )
    {
        pair<int,ll> t = solveUsingDFS(i,maskBoard);
        numInserts += t.second;
        if( t.first != -1)
        {
             return {t.first,numInserts};
        }
    }
}
double stdDev(vector < double > values , double avg)
{
    double toRet = 0;
    for ( int i = 0 ; i < values.size() ; i ++ )
    {
        toRet += ((values[i]-avg)*(values[i]-avg));
    }
    toRet/=values.size();
    toRet = sqrt(toRet);
    return toRet;
}
int main()
{
    srand (time(NULL));
    freopen("archivo.out","w",stdout);
    cout<<"Each Test Case with a shuffle of 20 steps" << endl;
	vector < double > times;
   double avg = 0;
   for(int i= 0 ; i < ExecPerSearch ;i ++ )
   {
        pair <int, ll >  sm = solveUsingBFS(0);
        cout << "Case " << i << " solved in " << sm.first << " moves with time " << sm.second<< endl;
        avg+=sm.second;
        times.push_back(sm.second);
   }
    avg/=ExecPerSearch;
    cout << "Average Time BFS = " << avg<< " with Std Dev= " << stdDev(times,avg) << endl;
    avg = 0;
    times.clear();
    for(int i= 0 ; i < 5 ; i ++ )
    {
         int xEsp, yEsp;
        xEsp = yEsp = 3;
        int board[4][4];
        copyBoard(boardObj,board);
        shuffleBoard(board,xEsp, yEsp,15);

        pair<int,ll> sm = solveUsingDFS(20,boardToMask(board));
        avg+=sm.second;
        cout <<"Case " << i << " solved in " << sm.first << " moves with time " << sm.second << endl;
        times.push_back(sm.second);
    }
    avg/=ExecPerSearch;
    cout << "Average Time DFS = " << avg << " with Std Dev= " << stdDev(times,avg)<< endl;
    avg = 0;
    times.clear();
    for(int i= 0 ; i < ExecPerSearch ;i ++ )
    {
        pair<int,ll> sm = IIDFS();
        cout <<"Case " << i <<  "solved in " << sm.first << " moves with time " << sm.second<< endl;
        avg+=sm.second;
        times.push_back(sm.second);
    }
    avg/=ExecPerSearch;
    cout << "Average Time IDFS = " << avg<< " with Std Dev= " << stdDev(times,avg) << endl;

    avg = 0;
    times.clear();
    for(int i= 0 ; i < ExecPerSearch ;i ++ )
    {
        pair<int,ll> sm = solveUsingAstarRab(0);


        double time_spent = sm.second;
        cout <<"Case " << i << " solved in " << sm.first << " moves with time " << time_spent<< endl;
        avg+=time_spent;
        times.push_back(time_spent);
    }
    avg/=ExecPerSearch;
    cout << "Average Time Rabon Kid = " << avg<< " with Std Dev= " << stdDev(times,avg)<< endl;

    avg = 0;
    times.clear();
    for(int i= 0 ; i < ExecPerSearch ;i ++ )
    {
        pair<int,ll> sm = solveUsingAstarMan(0);
        double time_spent = sm.second;
        cout <<"Case " << i << " solved in " << sm.first << " moves with time " << time_spent<< endl;
        avg+=time_spent;
        times.push_back(time_spent);
    }
    avg/=ExecPerSearch;
    cout << "Average Time Manhattan Dist = " << avg << " with Std Dev= " << stdDev(times,avg)<< endl;


}
