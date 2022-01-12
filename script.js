let lista=[];
      let indice=0;
		function LlenarSelect(){
      select = document.getElementById("producto");
      for(i = 0; i <lista.length; i++){
      option = document.createElement("option");
      option.value = lista[i].nombre;
      option.text = lista[i].nombre;
      select.appendChild(option);
      }
      
    } 
      
		function ingresar(){
			let no=document.getElementById('nom').value;
			let ca=document.getElementById('can').value;
			let vu=document.getElementById('vun').value;
			let ele=new obj(no,ca,vu);
			lista.push(ele);
			limpiar();
		}
		function obj(nombre,cantidad,valorun){
			this.nombre=nombre;
			this.cantidad=cantidad;
			this.valorun=valorun;
			this.total=function(){
				let rea=parseInt(this.cantidad)*parseInt(this.valorun);
				return rea;
			};
		}
		
		function limpiar(){
			document.getElementById('nom').value="";
			document.getElementById('can').value="";
			document.getElementById('vun').value="";
			document.getElementById('nom').focus();
		}
    
        function interface(some){
        document.getElementById('ejem').innerHTML=some;
        }
            function getArchivo(myllamada){
                let req=new XMLHttpRequest();
                req.open('GET', 'ingreso.html');
                req.onload=function(){

                    if (req.status==200) {
                        myllamada(this.responseText);
                    }else{
                        myllamada("error: "+req.status);
                    }
                }
              req.send();
            }
          
    async function getMostrar(){
            setTimeout(function(){
              mostrar();
            },100);
            let promesa=new Promise(function(resolve){
                let req=new XMLHttpRequest();
                req.open('GET','mostrar_lista.html');
                req.onload=function(){
                    if(req.status==200){
                        resolve(req.response);
                    }else{
                        resolve("error, file not found");
                    }
                };
                req.send();
            });
          
            return document.getElementById('ejem').innerHTML=await promesa;
          
            
        }
      
        async function getEliminar(){
          setTimeout(function(){
              LlenarSelect();
            },100);
            let promesa=new Promise(function(resolve){
                let req=new XMLHttpRequest();
                req.open('GET','eliminar.html');
                req.onload=function(){
                    if(req.status==200){
                        resolve(req.response);
                    }else{
                        resolve("error, file not found");
                    }
                };
                req.send();
            });
            
            return document.getElementById('modi').innerHTML=await promesa;
            
        }
        async function getModificar(){
          setTimeout(function(){
              LlenarSelect();
            },100);
            let promesa=new Promise(function(resolve){
                let req=new XMLHttpRequest();
                req.open('GET','modificar.html');
                req.onload=function(){
                    if(req.status==200){
                        resolve(req.response);
                    }else{
                        resolve("error, file not found");
                    }
                };
                req.send();
              
            });
          
            return document.getElementById('modi').innerHTML=await promesa;
          
        }
        async function getCompra(){
          setTimeout(function(){
              iva();
            },100);
            let promesa=new Promise(function(resolve){
                let req=new XMLHttpRequest();
                req.open('GET','compra.html');
                req.onload=function(){
                    if(req.status==200){
                        resolve(req.response);
                    }else{
                        resolve("error, file not found");
                    }
                };
                req.send();
            });
            return document.getElementById('ejem').innerHTML=await promesa;
          
        }
      function eliminar(){
        lista.splice(buscar(),1);
        mostrar();
      }
      function buscar(){
            let buscar=document.getElementById('producto').value;
            let aux=false;
            for (var j=0;j<lista.length;j++){
                if(lista[j].nombre == buscar){
                    aux=true;
                    indice=j;
                    j=j+100;
                    

                }
            

            }
            if(aux){
            
                return indice;
            }else{
              alert("no existe elemento")
            }  
            }
      function modificar(){
        lista[buscar()].cantidad=document.getElementById('ncant').value;
        mostrar();
      }
      async function getDescuento(){
          
            let promesa=new Promise(function(resolve){
                let req=new XMLHttpRequest();
                req.open('GET','descuento.html');
                req.onload=function(){
                    if(req.status==200){
                        resolve(req.response);
                    }else{
                        resolve("error, file not found");
                    }
                };
                req.send();
            });
            return document.getElementById('descuento').innerHTML=await promesa;
          
        }
      function descuento(){
        let desc=parseInt(document.getElementById('desc').value);
        let sumaiva=0;
			let sumatotal=0;
			let neto=0;
      let tdesc=0;

			for (var i = 0; i <lista.length; i++) {
				sumaiva+=lista[i].ivva();
				sumatotal+=lista[i].total();
			}
      neto=sumatotal+sumaiva;
      tdesc=neto*(desc/100);
      let tf=neto-tdesc;
      let text="<table class='table table-striped'>";
      text+="<tr><td>descuento del "+desc+"%</td><td>$"+tdesc+"</td></tr>";
      text+="<tr><td>total final:</td><td>$"+tf+"</td></tr>";
      text+="</table>"
      document.getElementById('totald').innerHTML=text;

      }

      function iva(){
        mostrar();
			obj.prototype.ivva=function(){
				let monto=this.total()*0.19;
				return monto;
			};
			let sumaiva=0;
			let sumatotal=0;
			let neto=0;
			for (var i = 0; i <lista.length; i++) {
				sumaiva+=lista[i].ivva();
				sumatotal+=lista[i].total();
			}
			neto=sumatotal+sumaiva;
      let txt="<table class='table table-striped' border='1'>"
			txt+="<tr><td>Bruto: </td><td>$"+sumatotal+"</td><tr>";
			txt+="<tr><td>IVA: </td><td>$"+sumaiva+"</td><tr>";
			txt+="<tr><td>Total: </td><td>$"+neto+"</td><tr>";
      txt+="</table>"
			document.getElementById('iva').innerHTML=txt;
		}
    
  function mostrar(){
			let contenido="<table border='1' class='table table-bordered table-striped'>";
			contenido+="<tr><td>nombre</td><td>cantidad</td><td>valor UN</td><td>total</td></tr>";
			for (var i = 0; i <lista.length; i++) {
				contenido+=  "<tr><td>"+lista[i].nombre+
							"</td><td>"+lista[i].cantidad+
							"</td><td>"+lista[i].valorun+
							"</td><td>"+lista[i].total()+
							"</td></tr>";
			}
      contenido+="</table>";
			document.getElementById('muestra').innerHTML=contenido;
      
	
		}
