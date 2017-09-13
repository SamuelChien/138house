<?php 
	$user_email = "samuelchien821@gmail.com";
	
	if($_SERVER['REQUEST_METHOD'] == "POST"){

		extract($_POST);

		$name = htmlspecialchars($cf_name);
		$email = htmlspecialchars($cf_email);
		$phone = htmlspecialchars($cf_tel);
		$message = htmlspecialchars($cf_message);
		$subject = isset($cf_subject) ? htmlspecialchars($cf_subject) : "Contact form";
		$headers = "";
		

		try{

			if(!filter_var($email, FILTER_VALIDATE_EMAIL)) throw new Exception("Your email address is incorrect!");

		}
		catch(Exception $e){

			echo $e->getMessage();
			die();

		}

		try{

			$headers .= 'From: No-Reply@138House.com' . "\r\n" .
		   			 	'Reply-To: No-Reply@138House.com' . "\r\n";
		   	$msg = "Name: $name\n" . "Email address: $email\nPhone: $phone\nMessage: $message";

			if(mail($user_email, $subject, $msg, $headers)) throw new Exception("Your message has been successfully sent!");
			else throw new Exception("Connection to server is failed!");

		}
		catch(Exception $e){

			echo $e->getMessage();

		}

	}
	
?>