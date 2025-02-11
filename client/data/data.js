import {getRequest} from './api-request.js';


let QuestionData = {};

QuestionData.fetch = async function(id){
    let data = await getRequest('question/'+id);
    return data;
}

QuestionData.fetchAll = async function(){
    let data = await getRequest('questions');
    return data;
}

QuestionData.fetchNiveau = async function(niveau){
    let data = await getRequest('questions?niveau='+niveau);
    return data;
}

export {QuestionData};