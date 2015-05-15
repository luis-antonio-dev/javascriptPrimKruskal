var HeapSorter = {

    parent : function(i){ return Math.floor(i+1/2)-1 },
    left : function(i){	return 2*(i+1)-1 },
    right : function(i){ return 2*(i+1) },

    heapify : function(A,i)
    {
        var l = this.left(i);
        if(l>=A.length)
            return;
        var r = this.right(i);
        var smallest = i;

        if(r<A.length)
        {
            if(l<=this.heap_size && A[l][2] < A[i][2])
                smallest = l;
            else
                smallest = i;
            if(r<= this.heap_size && A[r][2] < A[smallest][2])
                smallest = r;
        }
        if(smallest != i)
        {
            var temp = A[smallest];
            A[smallest] = A[i];
            A[i] = temp;
            this.heapify(A,smallest);
        }
    },


    buildHeap: function (A) {
        this.heap_size = A.length;
        var i = Math.round(A.length/2);
        while(i>=0)
        {
            this.heapify(A,i);
            i--;
        }
    },

    extractMin: function (A) {
        if(this.heap_size > 1)
        {
            var min = A[0];
            A[0] = A[this.heap_size];
            this.heap_size--;
            this.heapify(A,1);
            return min;
        }
    }
};

var Prim = function(_grafo,_callback)
{
	var grafo = _grafo;
	
	var result = [];
	var corteA = [];
	var corteB = JSON.parse(JSON.stringify(grafo.vertices));
	
	var posicao = Math.floor(Math.random() * grafo.vertices.length);
    //var posicao = 1;

    console.log(posicao);

	corteA.push(JSON.parse(JSON.stringify(corteB[posicao])));
    corteB.splice(posicao,1);

    var indiceArestas = {};

    for(var key in grafo.arestas)
    {
        if(!indiceArestas[grafo.arestas[key][0]])
            indiceArestas[grafo.arestas[key][0]] = [];
        indiceArestas[grafo.arestas[key][0]].push(grafo.arestas[key]);
    }

	while(corteB.length > 0)
	{
		var arestaDeCorte = [];
		for(var n in corteA)
		{
            for(var a in indiceArestas[corteA[n]])
            {
                if(corteB.indexOf(indiceArestas[corteA[n]][a][1]) != -1)
                {
                    arestaDeCorte.push(indiceArestas[corteA[n]][a]);
                }
            }
		}

        HeapSorter.buildHeap(arestaDeCorte);
        var arestaMin = HeapSorter.extractMin(arestaDeCorte);

        if(arestaMin.length >0)
        {
            result.push(arestaMin);
            var nodoCorte = arestaMin[1];

            var position = corteB.indexOf(nodoCorte);
            if(~position) corteB.splice(position,1);
            corteA.push(nodoCorte);
        }
    }

    grafo.arestas = result;

    return  grafo;
};