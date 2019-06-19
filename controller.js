'use strict'

const response = require('./response');
const connection = require('./connection');

exports.index = function(req, res, next ){
    response.success( 'welcome to my assigment' , res);
    next();
};

exports.getAllNote = function(req, res){
    connection.query(
        `SELECT note.id_note, note.title, note.content, note.date, note.date_update, category.category_name as category 
        FROM note LEFT OUTER JOIN category ON note.id_category=category.id_category`,
        function(error, rows, field){
            if(error){
                throw error;
            }else if(rows.length != 0){
                let end=rows.length;
                for(let i = 0; i < end; i++){
                    let obj = rows[i];
                    if(obj.category === null) obj.category = 'There is no category';
                }
                response.success(rows, res);
            } else { 
                response.success( 'There is no data' , res);
            }
        }    
    );
    
}

exports.getAllCategory = function(req, res){
    connection.query(
        `SELECT * FROM category`,
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

exports.getNoteById = function(req, res) {
    let idNote = req.params.idNote;
    connection.query(`SELECT * FROM note where id_note=?`,
    [ idNote ], 
    function (error, rows, fields){
        if(error){
            throw error;
        }else if(rows.length != 0){
            response.success(rows, res);
        } else { 
            response.success( 'There is no data' , res);
        }
    });
};

exports.getCategoryById = function(req, res) {
    let idCategory = req.params.idCategory;
    connection.query(
    `SELECT * FROM category where id_category=?`,
    [ idCategory ], 
    function (error, rows, fields){
        if(error){
            throw error;
        }else if(rows.length != 0){
            response.success(rows, res);
        } else { 
            response.success( 'There is no data' , res );
        }
    });
};

exports.postNote = function(req, res){
    let title = req.body.title;
    let content = req.body.content;
    let idCategory = req.body.id_category;
    let date = new Date();
    if(title == null || content == null || idCategory == null){
        res.send({
            error: true,
            message: "fields of title or content or id_catagory aren't empety(null)"
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
                    data: rows,
                    message: 'data berhasil di simpan'
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
            message: "field of category_name isn't empety(null)"
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
                    data: rows,
                    message: 'data berhasil di simpan'
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
    if(title == null || content == null || idCategory == null || dateUpdate == null || idNote == null){
        res.send({
            error: true,
            message: "fields of title or content or id_ctg aren't empety(null)"
        })
    } else {
    connection.query(
        `UPDATE note SET title=?, content=?, date_update=?, id_category=? WHERE id_note=?`,
        [title, content, dateUpdate, idCategory, idNote],
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

exports.putCategory = function (req, res){
    let idCategory =req.body.id_category || req.params.idCategory;
    let categoryName = req.body.category_name;
    let dateUpdate = new Date();
    if(idCategory == null || categoryName == null || dateUpdate == null){
        res.send({
            error: true,
            message: "fields of catagory_name or id_category aren't empety(null)"
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
            message: "field id_note aren't empety(null)"
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
            message: "fields of id_category aren't empety(null)"
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