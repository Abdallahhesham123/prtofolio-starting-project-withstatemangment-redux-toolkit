const endpoints ={
    


    resetpasswordG:(dataToSend ,id ,token)=>{
                    return {
                        url : `http://localhost:5000/auth/reset-password-forgetted/${id}/${token}`,
                        options:{
                            method: 'POST',
                            body: JSON.stringify(dataToSend),
                            headers: {
                                'Content-type': 'application/json',
                            },
                        }
                    }

                },

}

export default endpoints;