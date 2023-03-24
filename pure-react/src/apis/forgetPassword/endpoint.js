const endpoints ={
    


    sendingemail:(dataToSend)=>{
                    return {
                        url : `http://localhost:5000/auth/forgetpassword`,
                        options:{
                            method: 'POST',
                            body: JSON.stringify(dataToSend),
                            headers: {'Content-Type': 'application/json'},
                        }
                    }

                },

}

export default endpoints;