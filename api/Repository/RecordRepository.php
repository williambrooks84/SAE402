<?php

require_once("Repository/EntityRepository.php");
require_once("Class/Record.php");


class RecordRepository extends EntityRepository
{

    public function __construct()
    {
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }

    public function find($id_record): ?Record
    {
        $requete = $this->cnx->prepare("
            SELECT * FROM Scores
            WHERE id_record = :value
        ");
        $requete->bindParam(':value', $id_record);
        $requete->execute();
        $result = $requete->fetch(PDO::FETCH_OBJ);

        if (empty($result)) {
            return null;
        }
        else {
            $record = new Record($result->id_record);
            $record->setNomRecord($result->nom_record);
            $record->setScoreRecord($result->score_record);
        }

        return $record;
    }

    public function findAll(): array
    {
        $requete = $this->cnx->prepare("
            SELECT * FROM Scores
            ORDER BY score_record DESC
        ");
        $requete->execute();
        $results = $requete->fetchAll(PDO::FETCH_OBJ);
    
        $records = [];
        foreach ($results as $result) {
            $record = new Record($result->id_record);
            $record->setNomRecord($result->nom_record);
            $record->setScoreRecord($result->score_record);
            $records[] = $record;
        }
        return $records;
    }


    public function save($record): bool
    {
        if ($record->getIdRecord() === null) {
            $requete = $this->cnx->prepare("
                INSERT INTO Scores (nom_record, score_record)
                VALUES (:nom_record, :score_record)
            ");
            $requete->bindParam(':nom_record', $record->getNomRecord());
            $requete->bindParam(':score_record', $record->getScoreRecord());
        } else {
            $requete = $this->cnx->prepare("
                UPDATE Scores
                SET nom_record = :nom_record, score_record = :score_record
                WHERE id_record = :id_record
            ");
            $requete->bindParam(':nom_record', $record->getNomRecord());
            $requete->bindParam(':score_record', $record->getScoreRecord());
            $requete->bindParam(':id_record', $record->getIdRecord());
        }

        return $requete->execute();
    }

    public function delete($id)
    {
        // Not implemented ! TODO when needed !
        return false;
    }

    public function update($commande)
    {
        // Not implemented ! TODO when needed !
        return false;
    }
}
