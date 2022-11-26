function addRow(tableID) {

	var table = document.getElementById(tableID);

	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);

	var colCount = table.rows[0].cells.length;

	for (var i = 0; i < colCount; i++) {

		var newcell = row.insertCell(i);

		newcell.innerHTML = table.rows[0].cells[i].innerHTML;
		//alert(newcell.childNodes);
		switch (newcell.childNodes[0].type) {
		case "text":
			newcell.childNodes[0].value = "";
			break;
		case "checkbox":
			newcell.childNodes[0].checked = false;
			break;
		case "select-one":
			newcell.childNodes[0].selectedIndex = 0;
			break;
		}
	}
}

function deleteRow(tableID) {
	try {
		var table = document.getElementById(tableID);
		var rowCount = table.rows.length;

		for (var i = 0; i < rowCount; i++) {
			var row = table.rows[i];
			var chkbox = row.cells[0].childNodes[0];
			if (null != chkbox && true == chkbox.checked) {
				if (rowCount <= 1) {
					alert("Cannot delete all the rows.");
					break;
				}
				table.deleteRow(i);
				rowCount--;
				i--;
			}

		}
	} catch (e) {
		alert(e);
	}
}




function myfunction(){
	var y=document.getElementsByClassName("update");
	var z=document.getElementsByClassName("edit");
	y[0].style.display="block";
	z[0].style.display="none";
	$("#username").prop('disabled', false)
	$("#psw").prop('disabled', false)
}

function addressfunction(){
	var x=document.getElementsByClassName("addressupdate");
	var y=document.getElementsByClassName("addaddress");
	var z=document.getElementsByClassName("deletebtn");
	x[0].style.display="block";
	y[0].style.display="none";
	z[0].style.display="block";
}




function productDetail(){
	$("#productdetail").submit();
}


function productfunction(){
var x=document.getElementsByClassName("addressupdate");
var i=document.getElementsByClassName("productdetail");

x[0].style.display="block";
i[0].style.display="none";

}
function closeAddModal(){
var x=document.getElementsByClassName("addressupdate");
var i=document.getElementsByClassName("productdetail");
x[0].style.display="none";
i[0].style.display="block";
}



