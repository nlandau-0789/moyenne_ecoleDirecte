String.prototype.trim = function() 
    {
        temp = String(this).replace("(", "").replace(")", "").replace(" ", "").replace("/","");
        return temp;
    };

var moyGenNum = 0;
var moyGenDenom = 0;

function insererMoyenne(matiere){
    var notes = matiere.children[3].children;
    var moyenne = matiere.children[2];
    var num = 0;
    var denom = 0;
    for (var i = 0; i < notes.length; i++) {
        var note = parseFloat(notes[i].querySelector("span.valeur").innerText.replace(",",".").split(" ")[0]);
        if (isNaN(note)){continue;}
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
    var moyCoeff = parseFloat(matiere.children[1].innerText.trim())
    moyGenNum += (num / denom) * moyCoeff;
    moyGenDenom += moyCoeff;
}

matieres = document.querySelectorAll("tr.ng-star-inserted");

for (var i = 0; i < matieres.length-1; i++) {
    insererMoyenne(matieres[i]);
}

var moyGen = document.createElement("a");
moyGen.innerText =`Moyenne générale : ${(moyGenNum / moyGenDenom) * 20}`;

document.querySelector("#encart-notes").insertBefore(moyGen, document.querySelector("#encart-notes > div.bloc-legende.clear.hidden-print.ng-star-inserted"))
