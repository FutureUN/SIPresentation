<section id="themes">
	<h2>Themes</h2>
		<p>
			Set your presentation theme: <br>
			<!-- Hacks to swap themes after the page has loaded. Not flexible and only intended for the reveal.js demo deck. -->
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/black.css'); return false;">Black (default)</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/white.css'); return false;">White</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/league.css'); return false;">League</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/sky.css'); return false;">Sky</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/beige.css'); return false;">Beige</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/simple.css'); return false;">Simple</a> <br>
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/serif.css'); return false;">Serif</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/night.css'); return false;">Night</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/moon.css'); return false;">Moon</a> -
			<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/solarized.css'); return false;">Solarized</a>
		</p>
</section>

H:

# ** Problem Solving by Searching **
### FutureUN - Sistemas Inteligentes 2018 - 1
by  [Sebastian Chaves](https://github.com/adamantwharf) - [Laura Santos](https://github.com/lsfinite) - [Jimmy Pulido](https://github.com/jiapulidoar)

H:

# Index

<!-- .slide: data-background="#7E2121" -->
 1. Agentes  <!-- .element: class="fragment" data-fragment-index="1"-->
 1. Estrategias de Búsqueda <!-- .element: class="fragment" data-fragment-index="3"-->
	* Breadth-first Search <!-- .element: class="fragment" data-fragment-index="3"-->
	* Uniform-cost Search <!-- .element: class="fragment" data-fragment-index="3"-->
	* Depth-first Search <!-- .element: class="fragment" data-fragment-index="3"-->
	* A* Search <!-- .element: class="fragment" data-fragment-index="3"-->
 1. El 15-Puzzle  <!-- .element: class="fragment" data-fragment-index="2"-->


H: ## Agentes
> Cualquier cosa que puede percibir su entorno a través de sensores (percepciones) y actuar sobre él mediante actuadores (Acciones).


V:

## Agentes Solucionadores de Problemas
<!-- .slide: data-background="#005050" -->
* Agentes basados en objetivos que deciden qué hacer para encontrar secuencias de acciones que conduzcan a estados deseables.
* Usan la representación atómica: Estados del mundo son considerados como un todo.

V:
### Formulación de objetivo:
Agente se le atribuye un **objetivo** (conjunto de estados del mundo)  y trata de satisfacerlo.

*Situación actual y Medida de Rendimieto*
>Medida de rendimiento: Criterio de la conducta del agente para lograr éxito.

¿Cómo debo actuar en el futuro?  <!-- .element: class="fragment" data-fragment-index="1"-->

V:

 ### Formulación del Problema

Dado un objetivo:
> es el proceso de decidir qué acciones y estados deben se considerados en la *búsqueda* de los estados deseables.

H:
### Ejemplo: Viaje en transmilenio:

<!-- .slide: data-background="#FFFFFF" -->
* En hora pico; actualmente en el Portal Usme. Clase de 7.
* Objetivo: Llegar al campus de la UN a tiempo.

<img src="map.jpg"> </img>

V:
##### Ejemplo: Viaje en transmilenio:
* **Medida de rendimiento**

* Formulación de problema:
	* Estados: Estaciones.
	* Acciones: Tomar un bus de una estación a otra.


V:
### Un problema tiene:

Estados, Estado inicial, función sucesor, Test objetivo, costo del camnino.

**¿Cómo hacer?**
> Sabemos que: El agente está en un estado inicial y sabemos donde va a ir tomada una acción.

Búsqueda: Proceso de entonctrar uns secuencia de acciones que cumpla con el objetivo.


V:
<!-- .slide: data-background="#FFFFFF" -->

### Busquedas de Soluciones:

<!-- .slide: data-background="#FFFFFF" -->

* Búsqueda a través del espacio de estados.
* **Árbol de búsqueda.**  generado a partir del estado inicial y la función de transición. Nuevos Nodos.


*Nodo:* Estado, Nodo Padre, Acción, Costo, Profundidad.


<img src="tree.png"> </img>

v:

<!-- .slide: data-background="#FFFFFF" -->

<img src="expa.png"> </img>

H:

## Estrategias de Búsqueda

* Elegir el orden de expansión de los nodos.

* Evaluación de las estrategias:
 * Completitud ¿Encuentra la Solución?
 * Complejidad Temporal: # Nodos generados/expandidos
 * Complejidad Espacial: Máx nodos en memoria
 * Optimalidad: Siempre solución bajo costo.


V:
#### Tipos de Estrategias de búsqueda
* No informadas:
	* BFS
	* DFS

* Informadas:
	* A*

V:

## BFS

<img src="BFS.gif" width="1000" height="500"> </img>

V:

## DFS

<img src="DFS.gif" width="1000" height="500" > </img>

V:
## A*

<img src="a.png"> </img>

H:

## El 15 Puzzle

* Objetivo: Ordenar un tablero.

<img src="15.png" width="250" height="250"> </img>

Máscara de bits

> 1111 1110 1101 1100 1011 1010 1001 1000 0111 0110 0101 0100 0011 0010 0001 0000
Décimal: 114779749030816545

v:
## El 15 Puzzel  

* Se desordenó el tablero con 15 movimientos aleatorios de la casilla vacía, a partir del tablero objetivo.

V:
## Ejemplo

|  |  |
|--|--|
| 2| 3|
| 1| 0|

* **mask = 00 00 00 00**   
* mask = mask |  2 << 0 = 00 00 00 10  
* mask = mask |  3 << 2 = 00 00 11 10
* mask = mask |  1 << 4 = 00 01 11 10
* mask = mask |  0 << 6 = 00 01 11 10   
> mask = 30  

V:
##  Reprecentación de Acciones:

dx = { 0 , 1 , 0 , -1 }

dy = { 1 , 0 ,-1,  0  }

Para una posición [ x , y ] en el tablero las posibles acciones son:

> x + dx[i] ,  y + dy[i]   para   0 <= i <= 3

V:
## Expansión del Árbol de búsqueda

Factor de ramificación es 4.

<img src="arboldia.png"> </img>


H:
## Resultados

<!-- .slide: data-background="#005050" -->

|  | BFS | DFS | IDF | A* Manhattan | Chino Rabón |
|--|-----|-----|-----|----|
|Promedio| 159963 | 2.7156e+06 | 311536 | 99 | 359  |
| Desviación | 96696 | 3.11804e+06 | 142197 | 77 | 275 |  
