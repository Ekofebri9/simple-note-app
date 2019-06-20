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
exports.successPage = function(values, res){
    const data ={
        status: values[0],
        data: values[1],
        total: values[2],
        page: values[3],
        totalpage: values[4],
        limit: values[5]
    };
    res.json(data);
    res.end();
};