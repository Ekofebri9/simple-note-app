'use strict'

const response = require('./response');
const connection = require('./connection');

exports.index = function(req, res, next ){
    response.success( 'welcome to my assigment' , res);
    next();
};

exports.getAllNote = function(req, res){
    let idNote = req.params.idNote;
    let search = req.query.search || null;
    let sort = req.query.sort || 'desc';
    let pages = req.query.page;
    let limit = parseInt(req.query.limit) || 10 ;
    let data = [];
    let offset = 0;
    let totalRows = 0;
    let totalPages = 0;
    let query = '';
    let queryCount = '';

    if(pages == null || pages == 0){
        pages = 0;
    } else {
        pages = parseInt(pages)-1;
    }

    offset = pages*limit ;

    if(idNote != null){
        query = `SELECT note.id_note, note.title, note.content, note.date,
        note.date_update, category.category_name as category 
        FROM note LEFT OUTER JOIN category ON note.id_category=category.id_category
        where note.id_note=${idNote}`
        queryCount = `SELECT COUNT(*) as total FROM note where id_note=${idNote}`;
    } else if(search == null){
        query = `SELECT note.id_note, note.title, note.content, note.date,
        note.date_update, category.category_name as category 
        FROM note LEFT OUTER JOIN category ON note.id_category=category.id_category 
        order by note.title ${sort} limit ${limit} offset ${offset}` ;
        queryCount = `SELECT COUNT(*) as total FROM note`;
    } else {
        query = `SELECT note.id_note, note.title, note.content, note.date,
        note.date_update, category.category_name as category 
        FROM note LEFT OUTER JOIN category ON note.id_category=category.id_category
        where note.title like '%${search}%' order by note.date ${sort} limit ${limit} offset ${offset} ` ;
        queryCount = `SELECT COUNT(*) as total FROM note where title like '%${search}%'`
    }
    
    connection.query(
        queryCount,
        function(error, rows, field){
            if(error){
                throw error;
            }else {
                totalRows = rows[0].total;
                totalPages = Math.ceil(totalRows/limit);
            }
        }    
    );
    connection.query(
        query,
        function(error, rows, field){
            if(error){
                throw error;
            }else if(rows.length != 0){
                let end = rows.length;
                for(let i = 0; i < end; i++){
                    let obj = rows[i];
                    if(obj.category === null) obj.category = 'There is no category';
                }
                data[0] = 200;
                data[1] = rows;
                data[2] = totalRows;
                data[3] = pages+1;
                data[4] = totalPages;
                data[5] = limit;
                response.successPage(data, res);
            } else { 
                response.success( 'There is no data' , res);
            }
        }    
    );
}

exports.getAllCategory = function(req, res){
    let idCategory = req.params.idCategory;
    let query = '';
    if (idCategory == null){
        query = `SELECT * FROM category`;
    } else {
        query = `SELECT * FROM category where id_category=${idCategory}`;
    }
    connection.query(
        query,
        function(error, rows, field){
            if(error){
                throw error;
            }else if(rows.length != 0){
                response.success(rows, res);
            } else { 
                response.success( 'There is no data' , res);
            }
        }    
    );
}

exports.postNote = function(req, res){
    let title = req.body.title;
    let content = req.body.content;
    let idCategory = req.body.id_category;
    let date = new Date();
    if(title == null || content == null || idCategory == null){
        res.send({
            error: true,
            message: "fields of title or content or id_catagory must be not empty"
        })
    } else {
    connection.query(
        `INSERT INTO note SET title=?, content=?, date=?, id_category=?`,
        [ title, content, date, idCategory ],
        function(error, rows, field){
            if(error){
                throw error;
            } else {
                return res.send({
                    error: false,
                    message: 'success to save data',
                    data: rows,
                })
            }
        }
        );
    };
};

exports.postCategory = function(req, res){
    let categoryName = req.body.category_name;
    let date = new Date();
    if(categoryName == null){
        res.send({
            error: true,
            message: "field of category_name must be not empty"
        })
    } else {
    connection.query(
        `INSERT INTO category SET category_name=?, date=?`,
        [ categoryName, date ],
        function(error, rows, field){
            if(error){
                throw error;
            } else {
                return res.send({
                    error: false,
                    message: 'success to save data',
                    data: rows
                })
            }
        }
        );
    };
};

exports.putNote = function (req, res){
    let idNote = req.body.id_note || req.params.idNote;
    let title = req.body.title;
    let content = req.body.content;
    let idCategory = req.body.id_category;
    let dateUpdate = new Date();
    let query = `UPDATE note SET` ;
    let params= [];
    if(idNote == null){
        res.send({
            error: true,
            message: "id_note is empty"
        })
    } else if(title != null){
        query += ` title=?,` ;
        params.push(title);
    } else if(content != null) {
        query += ` content=?,` ;
        params.push(content);
    } else if(idCategory != null) {
        query += ` id_category=?,` ;
        params.push(parseInt(idCategory));
    } 
    params.push(dateUpdate);
    params.push(parseInt(idNote));
    connection.query(
        //`UPDATE note SET title=?, content=?, date_update=?, id_category=? WHERE id_note=?`,
        query+` date_update=? WHERE id_note=? `,
        //[title, content, dateUpdate, idCategory, idNote],
        params,
        function(error, rows, field){
            if(error){
                throw error;
            }else if(rows.affectedRows != 0){
                rows.message = "success for updating data!";
                response.success(rows, res);
            } else {
                return res.send({
                    error: false,
                    data: rows,
                    message: 'There is no data to edit'
                })
            }
        }
        );
}

exports.putCategory = function (req, res){
    let idCategory =req.body.id_category || req.params.idCategory;
    let categoryName = req.body.category_name;
    let dateUpdate = new Date();
    if(idCategory == null || categoryName == null || dateUpdate == null){
        res.send({
            error: true,
            message: "fields of catagory_name or id_category aren't empty"
        })
    } else {
    connection.query(
        `UPDATE category SET category_name=?, date_update=? WHERE id_category=?`,
        [categoryName, dateUpdate, idCategory],
        function(error, rows, field){
            if(error){
                throw error;
            }else if(rows.affectedRows != 0){
                rows.message = "success for updating data!";
                response.success(rows, res);
            } else {
                return res.send({
                    error: false,
                    data: rows,
                    message: 'There is no data to edit'
                })
            }
        }
        );
    }
}

exports.deleteNote = function(req, res) {
    let idNote = req.body.id_note || req.params.idNote;
    if (idNote == null){
        res.send({
            error: true,
            message: "field id_note must be not empty"
        })
    } else {
    connection.query('DELETE FROM note WHERE id_note=?',
    [ idNote ], 
    function (error, rows, fields){
        if(error){
            throw error;
        }else if(rows.affectedRows != 0){
            rows.message = "success for deleting data!";
            response.success(rows, res);
        } else { 
            response.success( 'There is no data to delete' , res);
        }
    });
    }
};

exports.deleteCategory = function(req, res) {
    let idCategory = req.body.id_category || req.params.idCategory;
    if (idCategory == null){
        res.send({
            error: true,
            message: "fields of id_category must be not empety"
        })
    } else {
    connection.query(
    'DELETE FROM category WHERE id_category=?',
    [ idCategory ], 
    function (error, rows, fields){
        if(error){
            throw error;
        }else if(rows.affectedRows != 0){
            rows.message = "success for deleting data!";
            response.success(rows, res);
        } else { 
            response.success( 'There is no data to delete' , res);
        }
    });
    }
};