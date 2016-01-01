
module.exports = function () {

    return function (req, res, next) {
        res.locals.flash = function () {
            var result = req.flash(), prop, messages = [], count;
            if (!Object.keys(result).length) {
                return undefined;
            }
            for (prop in result) {
                if (result.hasOwnProperty(prop) && result[prop].length) {
                    for (count = 0; count < result[prop].length; count += 1) {
                        messages.push({"type": prop, "msg": result[prop][count]});
                    }
                }
            }
            return messages;
        };
        next();
    };

};




