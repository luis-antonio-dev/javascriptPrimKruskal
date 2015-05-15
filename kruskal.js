var Kruskal = function(_grafo)
{

var grafo = _grafo;
var A = [];
var pi = {};
var rank = {};
var indiceInvertido = [];

var result = {};
result.vertices = grafo.vertices;
result.posicao = grafo.posicao;

function make_set(x)
{
	pi[x] = x;
	rank[x] = 0;
}

function find_set(x)
{
	while(x != pi[x])
		x = pi[x];
	return x;
}

function union(x,y)
{
	rx = find_set(x);
	ry = find_set(y);
	if(rx==ry) return;
	if(rank[rx]>rank[ry])
		pi[ry] = rx;
	else
	{
		pi[rx] = ry;
		if(rank[rx] == rank[ry])
			rank[ry] = rank[ry] + 1;
	}
}

	for(var vertice in grafo.vertices)
		make_set(vertice);
	
    for(var i in grafo.arestas)
    {
        if(!indiceInvertido[grafo.arestas[i][2]])
            indiceInvertido[grafo.arestas[i][2]] = [];
        indiceInvertido[grafo.arestas[i][2]].push(grafo.arestas[i]);
    }
		
	for(var i in indiceInvertido)
	{
		for(var j in indiceInvertido[i])
		{
			if(find_set(indiceInvertido[i][j][0]) != find_set(indiceInvertido[i][j][1]))
			{
				A.push(indiceInvertido[i][j])
				union(indiceInvertido[i][j][0],find_set(indiceInvertido[i][j][1]));
			}
		}
	}
	result.arestas = A;
	return result;
}

