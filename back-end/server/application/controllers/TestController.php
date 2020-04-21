<?php

require APPPATH.'libraries/REST_Controller.php';

/*
	Questo è un Controller di test.
*/

class TestController extends REST_Controller {

	public function __construct($config = 'rest')
	{
		parent::__construct($config);
	}


	public function index_get() {
		/*
		Il framework ha diverse configurazioni.
		In config.php hai da settarti le varie cose tipo dove salvare le sessioni PHP, e alcune sulla sicurezza (tipo CSRF, 
		e global_xss_filtering). Abbiamo info anche sui cookie e sulle sessioni appunto, ma comunque lato server questi non li useremo.
		
		Quindi le cose in /application/config/config.php è solo la base_url, non credo andremo ad utilizzare altro.
		
		Invece il file /application/config/autoload.php è importante. Qui praticamente possiamo caricare le librerie, packages, 
		drivers, config e models senza doverli inizializzare in ogni controller.
		Ad esempio se vedi c'è in Autoload il "TestModel" che si riferisce al file TestModel.php nella cartella application/models. 
		In questa maniera possiamo accedere alle funzioni di quella classe senza dover inizializzarlo ogni volta in ogni controller (basta fare $this->TestModel->nomefunzione(parametri);).
		
		Sempre nell'autoload.php c'è un $autoload['helper'], praticamente diciamo che sono funzioni di "aiuto", come dice il nome. 
		Ad esempio potremmo creare una funzione tipo "response_function($params) { ritorna un array con success e messaggio } (insomma, una funzione per le risposte API). 
		Il file si chiamerà, se non ricordo male (magari vedi la docs), response_helper ad esempio, e quindi nell'autoload puoi fare $autoload['helper'] = array('response', etc);. 
		Così in qualsiasi file (modello/controller/view che sia) potrai usare response_function();. 
		Questo è comodo così se devi modificà la response basta che lo fai una sola volta. 
		
		Per quanto riguarda le funzioni che ti permettono di fare le query ti lascio la documentazione https://codeigniter.com/userguide3/database/queries.html non è niente di complicato.
		Se hai domande ask me sempre.
		
		Come vedi qua ho fatto index_get() quindi sarà richiesta GET, index_post() sarebbe stata post.
		Per il routing c'è tutto in application/config/routes.php.
		
		$route['nomechevuoimostrare'] = "TestController/index";
		
		e quindi accedi a questa pagina semplicemente facendo sitolocale/nomechevuoimostrare
		
		ovviamente avresti potuto fare tipo $route['a/b'] = "testcontroller/index" e accedere da sitolocale/a/b
		
		Per le route dinamiche $route['prodotto/:num'] = 'testcontroller/$1'; dove $1 sarà tipo un numeretto.
		Puoi mettere delle regex ovviamente al posto di :num tipo.
		
		Configurazione del database in application/config/database.php basta che cambi nome utente, password e basta.. penso ah forse il nome del db
		
		Puoi passare parametri al controller tipo index_get($id), e sarebbe TestController/index/ID
		se fai echo $id; ti stamperebbe ID.
		
		Questo è tutta la base che ti serve per lavorarci.. niente di più o meno.
		
		Su TestModel (application/models/testmodel) c'è un esempio di query banalisssima.
		
		*/
		return $this->response(array("status" => "ok", "users" => $this->TestModel->getUsers()), REST_Controller::HTTP_OK);
	}

}
