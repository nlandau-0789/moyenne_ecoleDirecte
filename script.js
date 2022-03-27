String.prototype.trim = function() 
    {
        temp = String(this).replace("(", "").replace(")", "").replace(" ", "").replace("/","");
        return temp;
    };
function insererMoyenne(matiere){
    var notes = matiere.children[3].children;
    var moyenne = matiere.children[2];
    var num = 0;
    var denom = 0;
    for (var i = 0; i < notes.length; i++) {
        var note = parseFloat(notes[i].querySelector("span.valeur").innerText.replace(",",".").split(" ")[0]);
        if (notes[i].querySelector("sub")) {
            note /= parseFloat(notes[i].querySelector("sub").innerText.trim());
        } else {
            note /= 20;
        }
        if (notes[i].querySelector("sup")) {
            var coeff = parseFloat(notes[i].querySelector("sup").innerText.trim());
        } else {
            var coeff = 1;
        }
        num += note * coeff;
        denom += coeff;
    }
    moyenne.innerText = (num / denom) * 20;
}

matieres = document.querySelectorAll("tr.ng-star-inserted");

for (var i = 0; i < matieres.length-1; i++) {
    insererMoyenne(matieres[i]);
}
