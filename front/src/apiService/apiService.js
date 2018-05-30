class ApiService {
  /**
    * define base url and field schemas here
    * @returns {ApiService}
    */
   constructor() {
       this.apiUrl = 'http://localhost:3000/graphql';
       this.coursesFields = `{id, title, author, description}`;
   }
  /**
    * Generic function to fetch data from server
    * @param {string} query
    * @returns {unresolved}
    */
   async getGraphQlData(resource, params, fields) {
       const query = `{${resource} ${this.paramsToString(params)} ${fields}}`;
       const res = await fetch(this.apiUrl, {
           method: 'POST',
           mode: 'cors',
           headers: new Headers({
               'Content-Type': 'application/json',
               'Accept': 'application/json',
           }),
           body: JSON.stringify({query}),
       });
       if (res.ok) {
          //  const body = await res.json();
          //  console.log(body.data);
           return await res.json();
       } else {
           throw new Error(res.status);
       }
   }
  /**
    * 
    * @param {object} params
    * @returns {array} users list or empty list
    */
   async getCourses(params = {}) {
       const data = await this.getGraphQlData(
           'courses', params, this.coursesFields
       );
       //return users list
       return data.users;
   }

  /**
    * 
    * @param {object} params
    * @returns {String} params
     converted to string for usage in graphQL
    */
   paramsToString(params) {
       let paramString = '';
       if (params.constructor === Object && Object.keys(params).length) {
           let tmp = [];
           for (let key in params) {
               let paramStr = params[key];
               if(paramStr !== '') {
                   if (typeof params[key] === 'string') {
                       paramStr = `"${paramStr}"`;
                   }
                   tmp.push(`${key}:${paramStr}`);
               }
           }
           if (tmp.length) {
               paramString = `(${tmp.join()})`;
           }
       }
       return paramString;
   }
}
export default new ApiService();