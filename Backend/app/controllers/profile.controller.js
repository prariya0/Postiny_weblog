const pool = require("../config/db");

const getSubscribed = (req, res) => {
    pool.getConnection((err, db) => {
        if (err) {
            console.log(err);
            res.status(500).json({'error':err});
            return;
        }
        const user_id = req.params.user_id;
        const profile_id = req.params.profile_id;
        db.query("SELECT subscribed_user_id FROM subscription WHERE subscriber_id = ? AND subscribed_user_id=?",
        [user_id,profile_id], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
            db.release();
        });
    });
}

const getAllArticle = (req, res) => {
    pool.getConnection((err, db) => {
        if (err) {
            console.log(err);
            res.status(500).json({'error':err});
            return;
        }
        const profile_id = req.params.profile_id;
        db.query(`SELECT article.*, category_name
                FROM article 
                JOIN category ON article.category_id=category.category_id 
                WHERE author_id = ?`,
        [profile_id], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
            db.release();
        });
    });
}

const getArticleData = (req, res) => {
    pool.getConnection((err, db) => {
        if (err) {
            console.log(err);
            res.status(500).json({'error':err});
            return;
        }
        const article_id = req.params.article_id;
        db.query(`SELECT article.*, category_name, username 
                FROM article 
                JOIN category ON article.category_id=category.category_id 
                JOIN userinfo ON article.author_id = userinfo.user_id
                WHERE article_id = ?`,
        [article_id], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
            db.release();
        });
    });
}


const getProfileData = (req,res) => {
    pool.getConnection((err, db) => {
        if (err) {
            console.log(err);
            res.status(500).json({'error':err});
            return;
        }
        const profile_id = req.params.profile_id;
        const query = "SELECT username,firstname, lastname, profile_pic, bio, (SELECT COUNT(*) FROM likearticle WHERE article_id IN (SELECT article_id FROM article WHERE author_id = ?)) AS totalLike, (SELECT COUNT(*) FROM subscription WHERE subscribed_user_id = ?) AS totalSub, (SELECT COUNT(*) FROM article WHERE author_id = ?) AS totalArticle FROM userInfo WHERE user_id = ?"
        
        db.query(query,
        [profile_id,profile_id,profile_id,profile_id], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
            db.release();
        });
    });
}

const getInterestCategory = (req,res) => {
    pool.getConnection((err, db) => {
        if (err) {
            console.log(err);
            res.status(500).json({'error':err});
            return;
        }
        const profile_id = req.params.profile_id;
        db.query("SELECT c.category_name FROM userinterest u JOIN category c ON u.category_id = c.category_id WHERE u.user_id = ?",
        [profile_id], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
            db.release();
        });
    });
}

const subscribe = (req,res) => {
    pool.getConnection((err, db) => {
        if (err) {
            console.log(err);
            res.status(500).json({'error':err});
            return;
        }
        const author_id = req.body.author_id;
        const user_id = req.body.user_id;
        db.query("INSERT INTO subscription (subscriber_id, subscribed_user_id) VALUES (?, ?)",
        [user_id,author_id], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
            db.release();
        });
    });
}

const updateBalanceUser = (req,res) => {
    pool.getConnection((err, db) => {
        if (err) {
            console.log(err);
            db.release();
            return;
        }
        const user_id = req.body.user_id;
        const amount = req.body.amount;
        db.query("UPDATE userinfo SET coin_balance = coin_balance - ? , updated_at = CURRENT_TIMESTAMP WHERE user_id = ?",
        [amount,user_id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
            db.release();
        });
   });
}

const getFullAdDay = (req,res) => {
    pool.getConnection((err, db) => {
        if (err) {
            console.log(err);
            db.release();
            return;
        }
        const article_id = req.params.article_id;
        db.query(`SELECT publish_date
        FROM advertisement
        WHERE publish_date > CURRENT_DATE
        GROUP BY publish_date
        INTERSECT
        ((SELECT publish_date
        FROM advertisement
        GROUP BY publish_date
        HAVING COUNT(article_id) >= 6)
        UNION
        (SELECT publish_date
        FROM advertisement
        WHERE article_id = ?)
        )`,
        [article_id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
            db.release();
        });
   });
    
    
}

const addAdvertise = (req,res) => {
    pool.getConnection((err, db) => {
        if (err) {
            console.log(err);
            db.release();
            return;
        }
        const article_id = req.body.article_id;
        const date = req.body.date;
        db.query(`INSERT INTO advertisement (article_id, publish_date) 
        VALUES (?, ?)`,
        [article_id,date], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
            db.release();
        });
   });
}

const checkAmount = (req,res) => {
    pool.getConnection((err, db) => {
        if (err) {
            console.log(err);
            db.release();
            return;
        }
        const user_id = req.params.user_id;
        db.query(`SELECT coin_balance 
        FROM userinfo
        WHERE user_id = ?`,
        [user_id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
            db.release();
        });
   });
}

module.exports = {
    getSubscribed,
    getAllArticle,
    getProfileData,
    getInterestCategory,
    subscribe,
    updateBalanceUser,
    getFullAdDay,
    getArticleData,
    addAdvertise,
    checkAmount
}