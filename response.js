'use strict'

exports.success = function(values, res){
    const data ={
        status: 200,
        success: "success request to server",
        content: values,
    };
    res.json(data);
    res.end();
};