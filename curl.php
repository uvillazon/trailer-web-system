 <?php
 echo  "eqweqwe";
 try{
 $service_url = 'http://192.168.60.22:8080/backend/elfec/svc_wmc.php?stateless=1&text=T3000922&_dc=1499364789935';
 var_dump($service_url);
       $curl = curl_init($service_url);
	   //print $curl;
       $curl_post_data = array(
            "action" => "search_objects",
			"usrname" => "UVILLAZON",
			"usrpwd" => "uv06102014spr"
            );
       curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
       curl_setopt($curl, CURLOPT_POST, true);
       curl_setopt($curl, CURLOPT_POSTFIELDS, $curl_post_data);
       $curl_response = curl_exec($curl);
	   //print $curl;
       curl_close($curl);
	   //print json_encode($curl_response);
	  // var_dump(json_decode($curl_response));
		
		$json = json_decode($curl_response);
		
		var_dump($json->data[0]->geo_json);
	   
	   }
	   catch(Exception $e){
		   print $e;
	   }
	   ?>