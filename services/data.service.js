const db = require('./db');
let accountDetails = {
    1000: { acno: 1000, username: "userone", balance: 5000, password: "user1" },
    1001: { acno: 1001, username: "usertwo", balance: 6000, password: "user2" },
    1002: { acno: 1002, username: "userthree", balance: 500, password: "user3" },
    1003: { acno: 1003, username: "userfour", balance: 600, password: "user4" },
    1004: { acno: 1004, username: "userfive", balance: 15000, password: "user5" },
    1005: { acno: 1005, username: "usersix", balance: 6000, password: "user6" }
}
let currentUser;













const register = (acno, username, password) => {

    return db.User.findOne({
        acno
    }).then(user => {
        console.log(user);
        if (user) {
            return {
                status: false,
                statusCode: 422,
                message: "user exists"
            }

        } else {
            const newUser = new db.User({
                acno,
                username,
                balance: 0,
                password

            });
            newUser.save();
            return {
                status: true,
                statusCode: 200,
                message: "Registration successful"
            }
        }

    })



    if (acno in accountDetails) {
        return {
            status: false,
            statusCode: 422,
            message: "user exists"
        }
    }

    accountDetails[acno] = {
        acno,
        username,
        balance: 0,
        password
    }

    //this.saveDetails();

    console.log(this.accountDetails);
    return {
        status: true,
        statusCode: 200,
        message: "registration successful"
    }

}










const login = (req, accno, pswd) => {
    var acno = parseInt(accno);
    return db.User.findOne({

            acno,
            password: pswd
        }).then(user => {
            if (user) {
                req.session.currentUser = user
                return {
                    status: true,
                    statusCode: 200,
                    message: "login Successful",
                    name: user.username,
                    acno: user.acno

                }
            }
            return {
                status: false,
                statusCode: 422,
                message: "incorrect login"
            }

        })
        //  let dataset = accountDetails;
        //         if (accno in dataset) {
        //           var  pswd1=dataset[accno].password
        //           if (pswd1 == pswd) {
        //            req.session.currentUser=dataset[accno]
        //            //  saveDetails();

    //                return {
    //             status:true,
    //             statusCode:200,
    //             message:"login Successful"
    //       }
    //   }
    //             else{

    //                return {
    //                  status:false,
    //                  statusCode:422,
    //                  message:"incorrect login"
    //               }
    //             }
    //         } 
    //         else {
    //             return {
    //                  status:false,
    //                  statusCode:422,
    //                  message:"There is no user with this Accno"
    //               }
    //         }


}










const deposite = (req, acno, password, amount) => {

    var amt = parseInt(amount);
    return db.User.findOne({
        acno,
        password
    }).then(user => {
        if (!user) {
            return {
                status: false,
                statusCode: 422,
                message: "There is no user with this Accno"
            }

        }
        user.balance += amt;
        user.save();
        return {
            status: true,
            statusCode: 200,
            message: "Account credited",
            balance: user.balance
        }
    })

    //  let dataset = accountDetails;
    //         if (acno in dataset) {
    //           var  pswd1=dataset[acno].password
    //           if (pswd1 == password) {
    //             dataset[acno].balance+=amt
    //             // this.saveDetails();

    //                 return {
    //                  status:true,
    //                  statusCode:200,
    //                  message:"Account credited",
    //                  balance:dataset[acno].balance
    //               }
    //            }
    //             else{

    //                return {
    //                  status:false,
    //                  statusCode:422,
    //                  message:"incorrect password"
    //               }
    //             }
    //         } else {
    //            return {
    //                  status:false,
    //                  statusCode:422,
    //                  message:"There is no user with this Accno"
    //               }

    //         }

}












const withdraw = (req, acno, password, amount) =>

    {
        var amt = parseInt(amount);

        return db.User.findOne({
            acno,
            password
        }).then(user => {
            if (!user) {
                return {
                    status: false,
                    statusCode: 422,
                    message: "Wrong Accno or Password"
                }

            }

            if (user.balance < amt) {
                return {
                    status: false,
                    statusCode: 422,
                    message: "Low Balance Amount ",

                }
            }
            user.balance -= amt;
            user.save();
            return {
                status: true,
                statusCode: 200,
                message: "Account Debited",
                balance: user.balance
            }
        })

        // let dataset = accountDetails;
        //      if (acno in dataset) {
        //        var  pswd1=dataset[acno].password
        //        if (pswd1 == password) {
        //          if(dataset[acno].balance>=amt)
        //           {
        //              dataset[acno].balance-=amt
        //              // this.saveDetails();

        //               return {
        //               status:true,
        //               statusCode:200,
        //               message:"Account Debited ",
        //               balance:dataset[acno].balance
        //            }
        //           }
        //          else{

        //             return {
        //                status:false,
        //               statusCode:422,
        //               message:"Low Balance Amount ",

        //            }
        //          }

        //         }
        //          else{

        //             return {
        //                status:false,
        //               statusCode:422,
        //               message:"incorrect login ",

        //            } 
        //          }
        //      } else {

        //           return {
        //                status:false,
        //               statusCode:422,
        //               message:"there is no user with this accno",

        //            } 
        //      }

    }


const deleteAccDetails = (acno) => {
    return db.User.deleteOne({
        acno: acno
    }).then(user => {
        if (!user) {
            return {
                status: false,
                statusCode: 422,
                message: "there is no user with this accno"

            }
        }
        return {
            status: true,
            statusCode: 200,
            message: "Deleted Account Number  " + acno + "  Successful "

        }
    })

}











module.exports = {
    register,
    login,
    deposite,
    withdraw,
    deleteAccDetails

}