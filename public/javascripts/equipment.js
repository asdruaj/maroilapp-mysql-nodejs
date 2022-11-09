window.addEventListener('load', ()=>{
  if (localStorage.getItem('mode') == 'light') {
    document.body.classList.toggle('light-theme-variables')
  }
})

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn")
menuBtn.addEventListener('click', ()=>{
  sideMenu.classList.remove('no-sidebar')
  sideMenu.classList.add('sidebar-visible')
})

closeBtn.addEventListener('click', ()=>{
  sideMenu.classList.remove('sidebar-visible')
  sideMenu.classList.add('no-sidebar')
})

var tbody = document.querySelector("#equipment-table > tbody")
var tbody2 = document.querySelector("#specialty-table > tbody")
var tbody3 = document.querySelector("#failure-table > tbody")
var specialtyForm = document.getElementById("specialtyForm")
var failureTableRows =   document.querySelectorAll("#failure-table > tbody > tr")
var data, nData, equipmentId, specialtyId, failureId;
tbody.onclick = async function (e) {
    e = e || window.event;

    let target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
        
    }
    if (target) {
        let cells = target.getElementsByTagName("td");
        removeHighlightTable1()
        for (var i = 0; i < cells.length; i++) {
            data = cells[0].textContent;
        }
        target.classList.add("equipmentSelected")
    }
      // Variables
      let rows, specialtyCells;
      rows = tbody2.getElementsByTagName("tr");
    
      // Loops through rows and hides those with elements that don't match the filter(data)
      for (let row of rows) { // `for...of` loops through the NodeList
        specialtyCells = row.getElementsByTagName("td")
        if (data === specialtyCells[2].textContent) {
          row.style.display = ""; // shows this row
        }
        else {
          row.style.display = "none"; // hides this row
        }
      }
    failureTableRows.forEach(element => {
      element.style.display="none"
    });
    console.log(data);
};

tbody2.onclick = function (e) {
    e = e || window.event;
    let data = [];
    let target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        let cells = target.getElementsByTagName("td");
        removeHighlightTable2()
        target.classList.add("specSelected")  
        for (var i = 0; i < cells.length; i++) {
            data.push(cells[i].textContent);
        }
    }
    nData = data.map(el => {
      return el.trim()
    })
          // Variables
          let failureRows, failureCells;
          failureRows = tbody3.getElementsByTagName("tr");
          
          // Loops through rows and hides those with elements that don't match the filter(nData)
          for (let row of failureRows) { // `for...of` loops through the NodeList
            failureCells = row.getElementsByTagName("td")
            if ((nData[0] == failureCells[2].textContent) && (nData[2] == failureCells[3].textContent)) {
              row.style.display = ""; // shows this row
            }
            else {
              row.style.display = "none"; // hides this row
            }
          }

    console.log(nData);
};

specialtyForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  if (data != null || data != undefined) {
    document.getElementById("equipmentId").value = data
    specialtyForm.submit()
  } else {
    alert("seleccione un equipo")
  }

});

failureForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  if (nData == null || nData == undefined) {
    alert("seleccione un tipo de falla")

  } else if (document.getElementById("failureText").value == "" ){
    alert("Introduzca una falla")
  } else{
    document.getElementById("specEquipmentId").value = nData[2]
    document.getElementById("specialtyId").value = nData[0]
    failureForm.submit()
    removeHighlight()
  }

});

function removeHighlightTable1(){
  let notActive = document.getElementsByClassName("equipmentSelected")
  let specNotActive = document.getElementsByClassName("specSelected")
  for (let i = 0; i < notActive.length; i++) {
    notActive[i].classList.remove("equipmentSelected")
  }
  for (let i = 0; i < specNotActive.length; i++) {
    specNotActive[i].classList.remove("specSelected")
  }

}
function removeHighlightTable2(){
  let notActiveSpec = document.getElementsByClassName("specSelected")
  for (let i = 0; i < notActiveSpec.length; i++) {
    notActiveSpec[i].classList.remove("specSelected")
  }

}

// MODAL
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btnEditEquipment = document.querySelectorAll(".editEquipment");
var btnEditSpecialty = document.querySelectorAll(".editSpecialty");
var btnEditFailure = document.querySelectorAll(".editFailure");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btnEditEquipment.forEach((el)=>{
  let equipmentForm =  document.getElementById("editEquipmentForm");
  let equipmentIdForm = document.getElementById("equipmentIdForm")
  let equipmentInput = document.getElementById("equipmentInput")

  el.addEventListener("click",()=>{
    let equipmentRow = el.closest('tr');
    equipmentId = equipmentRow.cells[0].textContent
    let equipmentContent = equipmentRow.cells[1].textContent
    
    if (document.getElementById("editSpecialtyForm").style.display == "block") {
      document.getElementById("editSpecialtyForm").style.display = "none"
    }else if(document.getElementById("editFailureForm").style.display == "block"){
      document.getElementById("editFailureForm").style.display = "none"
    }
    modal.style.display="block";
    equipmentForm.style.display = "block";
    equipmentForm.action = `/equipment/editEquipment/${equipmentId}`;
    equipmentIdForm.value = equipmentId
    equipmentInput.value = equipmentContent
    document.getElementById("modalHeader").textContent = `Editando Equipo N° ${equipmentId} . . .`  
  })
})

btnEditSpecialty.forEach((el)=>{
  let specialtyForm =  document.getElementById("editSpecialtyForm");
  let specialtyIdForm = document.getElementById("specialtyIdForm");
  let specialtyInput = document.getElementById("specialtyInput")

  el.addEventListener("click",()=>{
    let specialtyRow = el.closest('tr');
    specialtyId = specialtyRow.cells[0].textContent
    let specialtyContent = specialtyRow.cells[1].textContent

    if (document.getElementById("editEquipmentForm").style.display == "block") {
      document.getElementById("editEquipmentForm").style.display = "none"
    }else if(document.getElementById("editFailureForm").style.display == "block"){
      document.getElementById("editFailureForm").style.display = "none"
    }
    modal.style.display="block"
    document.getElementById("editSpecialtyForm").style.display = "block"
    specialtyForm.action = `/equipment/editSpecialty/${specialtyId}`
    specialtyIdForm.value = specialtyId
    specialtyInput.value = specialtyContent
    document.getElementById("modalHeader").textContent = `Editando Tipo de Falla N° ${specialtyId} . . .`
  })
});

btnEditFailure.forEach((el)=>{
  let failureForm =  document.getElementById("editFailureForm");
  let failureIdForm = document.getElementById("failureIdForm");
  let failureInput = document.getElementById("failureInput")

  el.addEventListener("click",()=>{
    let failureRow = el.closest('tr');
    failureId = failureRow.cells[0].textContent
    let failureContent = failureRow.cells[1].textContent
    if (document.getElementById("editEquipmentForm").style.display == "block") {
      document.getElementById("editEquipmentForm").style.display = "none"
    }else if(document.getElementById("editSpecialtyForm").style.display == "block"){
      document.getElementById("editSpecialtyForm").style.display = "none"
    }
    modal.style.display="block"
    document.getElementById("editFailureForm").style.display = "block"
    failureForm.action = `/equipment/editFailure/${failureId}`
    failureIdForm.value = failureId
    failureInput.value = failureContent
    document.getElementById("modalHeader").textContent = `Editando Falla N° ${failureId} . . .`
  })
});

// When the user clicks on <span> (x), close the modal
document.getElementById("close").addEventListener("click",()=>{
  modal.style.display = "none";
  
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const equipmentDeleteForm = document.getElementById('deleteEquipmentForm');
const specialtyDeleteForm = document.getElementById('deleteSpecialtyForm');
const failureDeleteForm = document.getElementById('deleteFailureForm');

equipmentDeleteForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  if (confirm('¿Está seguro que desea eliminar este elemento?') == true ) {
    equipmentDeleteForm.submit()
  }
})

specialtyDeleteForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  if (confirm('¿Está seguro que desea eliminar este elemento?') == true ) {
    specialtyDeleteForm.submit()
  }
})

failureDeleteForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  if (confirm('¿Está seguro que desea eliminar este elemento?') == true ) {
    failureDeleteForm.submit()
  }
})