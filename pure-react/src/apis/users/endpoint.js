const endpoints ={
    

    getAll :()=>{
            return {

                url : `http://localhost:5000/user/`,
                options:{
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            }
                
                    },
     getprofile :()=>{
        return {

            url : `http://localhost:5000/user/getProfile/`,
            options:{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }
        }
            
                },
                updateuser:(updatedataToSend)=>{
                    return {
                        url : `http://localhost:5000/user/findByIdAndUpdate`,
                        options:{
                            method: 'PUT',
                            body: JSON.stringify(updatedataToSend),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                        }
                    }

                },
                resetpassword:(dataToSend)=>{
                    return {
                        url : `http://localhost:5000/auth/resetpassword`,
                        options:{
                            method: 'PUT',
                            body: JSON.stringify(dataToSend),
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                              },
                        }
                    }

                },
}

export default endpoints;