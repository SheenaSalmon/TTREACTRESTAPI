// File base on TeamTreeHouse 



export default class Data{

      apiBaseUrl= 'http://localhost:5000/api';

      api(path,method="GET",body = null,reuqiresAuth =false,credentials =null)
      {
          
        const url =this.apiBaseUrl + path;
        
        const options={
              method,
              headers:{
                  'Content-Type': 'application/json; charset=utf-8'
              }
          };

          if(body !==null)
          {
              options.body =JSON.stringify(body);
          }

          if(reuqiresAuth)
          {
              const encodedCredentials =btoa(`${credentials.username}:${credentials.password}`);
              options.headers['Authorization']=`Basic ${encodedCredentials}`
          }

          return fetch(url, options);
      }


      async getUser(username, password){
          const response= await this.api('/users', 'GET', null,true, {username, password});

          if(response.status === 200)
          {
              return response.json().then(data => data);
          }
          else if(response.status === 401)
          {
              return null
          }
          else{
              throw new Error()
          }
      }


    async createUser(user)
    {
        const response = await this.api('/users', 'POST', user);
        console.log(`This is the user in data ${user.firstName}`)

        if(response.status === 201)
        {
            return [];
        }
        else if (response.status === 400)
        {
            return response.json().then(
                data =>
                {
                    return data.errors;
                }        
            )
        }
        else{
            throw new Error();
        }
    }

    async createCourse(user,course)
    {
        const response = await this.api('/courses','POST',course,true,user);
        console.log(`This is course response:${Object.entries(course)}`)
    }

    async getCourses()
    {
            const response = await this.api('/courses','GET')
            if(response.status === 200)
            {
                return response.json().then( data => data)
            }
            else if (response.status ===401)
            {
                return  null
            }
            else{
                throw new Error()
            }
    }

    async getCourse(id)
    {
            const response = await this.api(`/courses/${id}`,'GET')
            if(response.status === 200)
            {
                return response.json().then( data => data)
            }
            else if (response.status ===401)
            {
                console.log("There was an error")
                return  null
                
            }
            else{
                throw new Error()
            }
    }






}

