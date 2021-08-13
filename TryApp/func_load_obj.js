 // Autor TheLoloS                                 
 //                     ***.                
 //               #  &         %&   %       
 //            *@@@(              %(  @     
 //        &&@@@@(....%@@.       @, %/ &    
 //   ,@@@&&@@@@@@@@@@@@@%@#      #& (.(((  
 //    * # &@@(  ,&&,@@@@@@(       &% @ %(/ 
 //       %%       &@@@@@@@%@,     *@ ,,#&, 
 //               #@@@@@@@@@@      *@  & @  
 //              /,/&@@@@@@,,     ,@  @.@*  
 //           #&**@@@@@@@@@@     (@ .* @(   
 //         @@@@@@@@@@@@@@# *. ##   .@@.    
 //          @@@@@@@@@@@@@@@, .(@@@@@.      
 //           *@@@@@@@@@@@@@@@@@@@/         
 //              (@,%@@@@@@,,               

 function addobjmtlobject(link_obj, link_mlt, scale, dPosition, dRotation) {
     loader.load(

         link_obj,

         function(object) {
             scene.add(object);
         });
 }

 var manager = new THREE.LoadingManager();
 var loader = new OBJLoader();
 loader.load(

     'https://cdn.jsdelivr.net/gh/TheLoloS/Scout-Adventure/tent.obj',

     function(object) {
         scene.add(object);
     });