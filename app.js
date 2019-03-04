// storage;
let storage = {
    addedLeft: [],
    addedRight: [],
    deletedFromRight: [],
    deletedFromLeft: [],
    
}


//variables for id deciding;
let number_of_income_ID = 0;
let number_of_expences_ID = 0;
let index = 0;
let index_2=0;



//show date at the page;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let d = new Date();
let curr_date = d.getDate();
let curr_year = d.getFullYear();
let budget__title = document.querySelector(".budget__title--month");
budget__title.textContent =`${curr_date +" "+ monthNames[d.getMonth()] +"."+ curr_year +" year"}`;




//search elements which will call functions;
let btn = document.querySelector(".add__btn");
let text = document.querySelector(".add__description");
let number = document.querySelector(".add__value");
let fromSelect = document.querySelector(".add__type");
let incomeTable = document.querySelector(".income");
let expencesTable = document.querySelector(".expenses");




//  listeners
btn.addEventListener("click", (e) => {
    if (!text.value || !number.value) return alertMessage("Введите все данные", "warning");
  
    if(fromSelect.selectedIndex == 0 ) {
         addElementToIncome(text.value, number.value);
       
    } else {  
        addElementToExpences(text.value, number.value);
    }
    calculateFunction ();
  
});

incomeTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-task")) {
        const id = e.target.closest(".item").id;
        deleteElementFromTable(id);
        deleteTaskFromAddedLeft (id);
    }

});

expencesTable.addEventListener("click", (e) => {
    if(e.target.classList.contains("delete-task")) {
        const id = e.target.closest(".item").id;
        deleteElementFromTable(id);
        deleteTaskFromAddedRight (id);
    }
});


/**
 * delete element from deletedFromLeft[] that was deleted out of left column;
 * @param {*} id id of added element to addedLeft[];
 */
function deleteTaskFromAddedLeft (id) {
    deletedTaskWriterToDeletedFromLeft(id);
    let newStorage = storage.addedLeft.filter(task => task.id != id);
    storage.addedLeft = newStorage;
     alertMessage("Задача удалена", "success");  
    
};
/**
 * delete element from deletedFromRight[] that was deleted out of right column;
 * @param {*} id id of added element to addedRight[];
 */
function deleteTaskFromAddedRight (id) {
    deletedTaskWriterToDeletedFromRight(id);
    let newStorage = storage.addedRight.filter(task => task.id != id);
    storage.addedRight = newStorage;
    alertMessage("Задача удалена", "success"); 
};
/**
 * add new element to  deletedFromLeft[] that was deleted;
 * @param {*} id id of deleted element from the left column;
 *
 */
function deletedTaskWriterToDeletedFromLeft (id) {
    let newStorage = storage.addedLeft.filter(task => task.id = id);
    storage.deletedFromLeft = newStorage; 
};
/**
 * add new element to  deletedFromRight[] that was deleted;
 * @param {*} id id of deleted element from the right column;
 *
 */
function deletedTaskWriterToDeletedFromRight (id) {
    let newStorage = storage.addedRight.filter(task => task.id = id);
    storage.deletedFromRight = newStorage; 
};

/**
 * delete  out element with certain id of page;
 * @param {*} id id of deleting element;
 *
 */
function deleteElementFromTable (id) {
    let deletingElement = document.getElementById(`${id}`);
    deletingElement.remove();
    calculateFunction (); 
    alertMessage("Задача удалена", "success");  
};
/**
 * add element to Income table;
 * @param {*} text text that will be add;
 * @param {*} number number that will be add;
 *
 */
function addElementToIncome(text, number) {
    let table = document.querySelector(".income__list");
    let template = newElementDescriptionIncome(text,number);
    table.insertAdjacentHTML("beforeend",template);
    idSeacherOfIncome();
    addTaskToIncome(text, number, id); 
    alertMessage("Финансы добавлены в Income", "success");
};

/**
 * add element to Expenses table;
 * @param {*} text text that will be add;
 * @param {*} number number that will be add;
 *
 */
function addElementToExpences( text, number) {
    let table = document.querySelector(".expenses__list");
    let template = newElementDescriptionExpences(text, number);
    table.insertAdjacentHTML("beforeend",template);
    idSeacherOfExpences();
    addTaskToExpences(text, number, id);
    alertMessage("Финансы добавлены в Expences", "success");
};
/**
 * for finding and returning of certain id of class  "item clearfix expense";
 * @returns {*} id of certain element of class  "item expense";
 */
const idSeacherOfExpences = () => {
    let elements = document.getElementsByClassName( "item expense" );
     return id = elements[number_of_expences_ID++].id;
};
/**
 * for finding and returning of certain id of class  "item clearfix";
 * @returns {*} id of certain element of class  "item clearfix";
 */
const idSeacherOfIncome = () => {
    let elements = document.getElementsByClassName( "item clearfix" );
     return id = elements[number_of_income_ID++].id;
};


/**
 * create template of new element that will be add to Expences table by other function contain this function;
 * @param {*} text some text that will be add to ".item__description";
 * @param {*} number some number that will be add to ".item__value";
 * @returns {*} template;
 */
 function newElementDescriptionExpences(text, number) {
    
    return `
    
                        <div class="item clearfix expense" id="expense-${index++}">
                            <div class="item__description">${text}</div>
                            <div class="right clearfix">
                                <div class="item__value" id = "right">${number}</div>
                                <div class="item__percentage">  </div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline delete-task"></i></button>
                                </div>
                            </div>
                        </div>                   
`
 };


/**
 * add element to addedRight[]
 * @param {*} text some text of label was entered
 * @param {*} number some number of label was entered
 * @param {*} id some id of element
 * @returns {*} storage.addedRight - array of elements that is added to the right side of table
 */
 function addTaskToExpences(text, number, id) {
    let addedRightElement = {text, number, id};
    storage.addedRight.push(addedRightElement);
    return storage.addedRight;
};


/**
 * add element to addedtLeft[]
 * @param {*} text some text of label was entered
 * @param {*} number some number of label was entered
 * @param {*} id some id of element
 * @returns {*} storage.addedRight - array of elements that is added to the left side of table
 */
function addTaskToIncome(text, number, id) {
    let addedLeftElement = {text, number, id};
    storage.addedLeft.push(addedLeftElement);
    return storage.addedLeft;
};



/**
 * create template of new element that will be add to Income table by other function contain this function;
 * @param {*} text some text that will be add to ".item__description";
 * @param {*} number some number that will be add to ".item__value";
 * @returns {*} template;
 */
 function newElementDescriptionIncome(text, number) {
    
    return `
    
                        <div class="item clearfix" id="income-${index_2++}">
                            <div class="item__description">${text}</div>
                            <div class="right clearfix">
                                <div class="item__value" id = "left">${number}</div>
                                <div class="item__percentage">   </div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline delete-task"></i></button>
                                </div>
                            </div>
                        </div>                    
`

 };



 /**
 * for calculating the summary value of all elements at the left side of table (Income);
 * @returns {*} value
 */
const  incomeEnumenator = () => {
    let forSum = Array.from(document.querySelectorAll(".item__value#left"));
    let value = 0;
    for( let i = 0 ; i < forSum.length; i++){
        let digit = parseInt(forSum[i].textContent);
         
         value += digit;
    };
    console.log(value);
    return value;
}
 /**
 * for calculating the summary value of all elements at the right side of table (Expenses);
 * @returns {*} value_2
 */
const  expencesEnumenator = () => {
    let forSum = Array.from(document.querySelectorAll(".item__value#right"));
    let value_2 = 0;
    for( let i = 0 ; i < forSum.length; i++){
        let digit = parseInt(forSum[i].textContent);
         value_2 += digit;
    };
    console.log(value_2);
    return value_2;
}

/**
 * calculate a summary value of all blocks, 
 * @returns {*} expenses.value + income.value;
 */
const enumenator = () => {
   console.log(expencesEnumenator()+incomeEnumenator());
   return expencesEnumenator()+incomeEnumenator();

};

/**
 * add a value of all incoming elements to ".budget__income__value";
 */
 const income = () => {
     let forAdding = document.querySelector(".budget__income__value");
     forAdding.innerHTML = "";
    forAdding.insertAdjacentHTML("beforeend",incomeEnumenator());
 };
 /**
 * add a value of all expenses elements to ".budget__income__value";
 */
 const expences = () => {
    let forAdding = document.querySelector(".budget__expenses__value");
    forAdding.innerHTML = "";
   forAdding.insertAdjacentHTML("beforeend",expencesEnumenator());
};
/**
 * add a value of budget to  ".budget__value";
 */
const allBudget = () => {
    let forAdding = document.querySelector(".budget__value");
    forAdding.innerHTML = "";
   forAdding.insertAdjacentHTML("beforeend",enumenator());
 }
/**
 * call all functions that calculate summary budget;
 */
function calculateFunction () {
    income();
    expences();
    enumenator();
    allBudget(); 
};


/**
 * alert message
 * @param {*} text text that will be show;
 * @param {*} type type of alert;
 */
function alertMessage(text, type) {
  
        swal({text, icon: type });
    
};



