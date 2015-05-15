var graphBuilder = function(_canvas) {

    var canvas = _canvas;
    var ctx;

    this.init = function(grafo)
    {
        if(canvas && canvas.getContext) {
            ctx = canvas.getContext("2d")
        }
        this.width = canvas.width;
        this.height = canvas.height;
        this.draw(grafo);
    }

    this.draw = function(grafo)
    {
        var self = this;
        ctx.fillStyle = "white";
        ctx.strokeStyle = 'lightgreen';
        ctx.lineWidth = 5;
        ctx.fillRect(0,0,self.width,self.height);

        ctx.fillStyle = 'black';

        ctx.font = 'italic 13pt Calibri';

        for(aresta in grafo.arestas)
        {
            var origin = grafo.posicao[grafo.arestas[aresta][0]];
			var destiny = grafo.posicao[grafo.arestas[aresta][1]];
			
            ctx.beginPath();
            ctx.moveTo(origin[0],origin[1]);
            ctx.lineTo(destiny[0],destiny[1]);
            ctx.stroke();
			
			ctx.fillText(grafo.arestas[aresta][2],((destiny[0]+origin[0])/2)+5,((destiny[1]+origin[1])/2)-5);
        }

        ctx.font = 'italic 15pt Calibri';
        for(var i=0;i<grafo.vertices.length;i++)
        {
            var posX = grafo.posicao[grafo.vertices[i]][0];
            var posY = grafo.posicao[grafo.vertices[i]][1];

            if(i==grafo.arestas[0][0])
            {
                ctx.fillStyle = 'red';
                this.canvas_arrow(posX-20,posY-20,posX-8,posY-8);
            }

            else
                ctx.fillStyle = 'black';

            ctx.beginPath();
            ctx.arc(posX,posY,10,0,2*Math.PI,false);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.fillText(grafo.vertices[i],posX-6,posY+5.5);

        }
    };

    this.canvas_arrow = function(fromx, fromy, tox, toy){
        var headlen = 10;   // length of head in pixels
        var angle = Math.atan2(toy-fromy,tox-fromx);

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));

        ctx.stroke();
    }

};
