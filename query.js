
function queryStatement()
{
    const conf = {
        "endpoint": "https://lmstest.lrs.io/xapi/",
        "auth": "Basic " + toBase64("sebwel:kofzuk")
      };
    ADL.XAPIWrapper.changeConfig(conf); 
    
    const parameters = ADL.XAPIWrapper.searchParams();
    
    //parameters["actor"] = {"mbox":"mailto:shakil@g.com"};
    parameters["verb"] = "http://adlnet.gov/expapi/verbs/completed";
    parameters["activity"] = "https://devlinpeck.com/tutorials/write-xapi-statement";//object id
    
    const queryData = ADL.XAPIWrapper.getStatements(parameters)
    console.log(queryData);
    alert(queryData.statements[0].verb.id);
}
