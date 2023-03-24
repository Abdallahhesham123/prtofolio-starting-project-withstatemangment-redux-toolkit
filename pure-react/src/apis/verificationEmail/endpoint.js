const endpoints ={
    


    verifyEmail:(dataToSend ,id)=>{
                    return {
                        url : `http://localhost:5000/auth/verify-email/${id}/${dataToSend}`,
                        options:{
                            method: 'POST',
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                              },
                        }
                    }

                },

}

export default endpoints;