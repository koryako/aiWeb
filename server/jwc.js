import {Base64} from "js-base64";
module.exports={
    parse:(token)=>{
    token=token.split(' ')[1];
    let header=Base64.decode(token.split('.')[0]);
    let payload=Base64.decode(token.split('.')[1]);
    return {header:JSON.parse(header),payload:JSON.parse(payload)};
}
 
 //let r=jwt.verify(tokon,scret);
      //  let r= Base64.decode("eyJ1bml0TmFtZSI6IuWchumAmuS_oeaBr-enkeaKgO-8iOilv-Wuie-8ieaciemZkOWFrOWPuCIsInVzZXJfbmFtZSI6IjAxNTE4NjQ3IiwicG9zaXRpb25zIjpbeyJuYW1lIjoi5oqA5pyv5p625p6E57uE5p625p6E5biIIiwiam9iQ29kZSI6Ijk5NDEwMEJVMDAwNDA0MDEifV0sInVuaXRzIjpbeyJuYW1lIjoi5oqA5pyv5p625p6E57uEIiwidW5pdENvZGUiOiI5OTQxMDBCVTAwMDQwNCJ9XSwidXNlck5hbWUiOiLmiLTmnbAiLCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl0sIm1hYyI6bnVsbCwiY2xpZW50X2lkIjoiZGVtbyIsInNjb3BlIjpbIndyaXRlIiwicmVhZCJdLCJ1bml0Q29kZSI6IjIxMDk5MSIsInVzZXJUeXBlIjoiMSIsImV4cCI6MTU1MTk5MjU1NCwianRpIjoiNThjYTdiODctZGViZi00ZmE3LTliNjAtMmEwNzc0MjJjZjBhIn0");
}