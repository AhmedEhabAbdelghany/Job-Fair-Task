let ourContainer = document.getElementById("ourContainer")
let inputValue = document.getElementById("inputValue")


const data = [{
    "customers": [{
        "id": 1,
        "name": "Ahmed Ali"
    },
    {
        "id": 2,
        "name": "Aya Elsayed"
    },

    {
        "id": 3,
        "name": "Mina Adel"
    },
    {
        "id": 4,
        "name": "Sarah Reda"
    },
    {
        "id": 5,
        "name": "Mohamed Sayed"
    }
    ],
    "transactions": [{
        "id": 1,
        "customer_id": 1,
        "date": "2022-01-01",
        "amount": 1000
    },
    {
        "id": 2,
        "customer_id": 1,
        "date": "2022-01-02",
        "amount": 2000
    },
    {
        "id": 3,
        "customer_id": 2,
        "date": "2022-01-01",
        "amount": 550
    },
    {
        "id": 4,
        "customer_id": 3,
        "date": "2022-01-01",
        "amount": 500
    },
    {
        "id": 5,

        "customer_id": 2,
        "date": "2022-01-02",
        "amount": 1300
    },
    {
        "id": 6,
        "customer_id": 4,
        "date": "2022-01-01",
        "amount": 750
    },
    {
        "id": 7,
        "customer_id": 3,
        "date": "2022-01-02",
        "amount": 1250
    },
    {
        "id": 8,
        "customer_id": 5,
        "date": "2022-01-01",
        "amount": 2500
    },
    {
        "id": 9,
        "customer_id": 5,
        "date": "2022-01-02",
        "amount": 875
    }
    ]
}]; 

const result = data.reduce((acc, current) => {
    current.customers.forEach((customer) => {
        const customerTransactions = current.transactions.filter((transaction) => transaction.customer_id === customer.id);
        acc.push({ ...customer, transactions: customerTransactions });
    });
    // return acc;
    displayData(acc)
}, []);




function displayData(result) {
    console.log(result);
    let cartona = ""
    result.map((value, index) => {
        cartona += `<tr>
            <thead>
                <tr class="bg-danger">
                                        <th class="text-center bg-red" colspan="6">${value.name}</th>

                </tr>

                <tr>
                    <th scope="col">Customer ID</th>
                        <th scope="row">${value.id}</th>
                 </tr>

            </thead>
            

        </tr>`
        let TransactionData = value.transactions.map((transRes, index) => {

            // console.log(transRes.amount + " " + transRes.date)
            cartona += `
            <tr>
                        <th scope="col">Transaction ID (${transRes.id})</th>


                        <th scope="col">Date :</th>
                        <td rowspan="1" colspan="2">${transRes.date}</td>


                        <th scope="col">Amount :</th>
                        <td rowspan="1" colspan="2">${transRes.amount}</td>
                </tr>
                    `


        })

    })

    ourContainer.innerHTML = cartona

}



inputValue.addEventListener('keyup', sarching)



function sarching() {
    const result2 = data.reduce((acc, current) => {
        current.customers.forEach((customer) => {
            const customerTransactions = current.transactions.filter((transaction) => transaction.customer_id === customer.id);
            acc.push({ ...customer, transactions: customerTransactions });
        });
        var searchword = inputValue.value
        var searchresult = [];

        acc.map((res) => {
            if (res.name.toLowerCase().includes(searchword.toLowerCase())) {
                searchresult.push(res)
                displayData(searchresult)
            } else if (searchword != "") {
                res.transactions.map((transRes, index) => {
                    if (transRes.amount == searchword) {
                        console.log(transRes)
                        searchresult.push(res)
                        displayData(searchresult)
                    } else {
                        console.log('we have error')
                    }
                })

            } else if (searchresult.length == 0) {
                // container.innerHTML = `<tr><td colspan="4"><img src="./images/notfound.gif" class="notfound w-75" alt=""></td></tr>`;
                console.log("res")
            }
        })
    }, []);
}
