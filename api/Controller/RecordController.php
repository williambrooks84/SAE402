<?php
require_once "Controller.php";
require_once "Repository/RecordRepository.php";


// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined. 

class RecordController extends Controller
{

    private RecordRepository $records;

    public function __construct()
    {
        $this->records = new RecordRepository();
    }


    protected function processGetRequest(HttpRequest $request)
    {
        $id = $request->getId("id");        

        if ($id) {
            // On donne le record en particulier
            return $this->records->find($id);
        } else {
            // Sinon on renvoie la liste de toutes les records
            return $this->records->findAll();
        }
    }

    protected function processPostRequest(HttpRequest $request)
    {
        $nom = $request->getParam("nom");
        $score = $request->getParam("score");

        if ($nom && $score) {
            $this->records->save($nom, $score);
            return "Record ajouté";
        } else {
            return "Erreur lors de l'ajout du record";
        }
    }
}
