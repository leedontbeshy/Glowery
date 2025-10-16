export class AdminRepository{
    static async getAllUser(queryParams){
        
        const {page = 1, limit = 20, search} = queryParams;
        const offset = (parseInt(page) - 1) * parseInt(limit);

        

        

        
        

    }
}