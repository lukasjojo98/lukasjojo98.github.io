document.getElementById('picture-input').onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
    
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            const img = document.getElementById('profile-image');
            img.src = fr.result;
            img.style = "height: 200px;";
            const previewElemenet = document.getElementById('profile-image-preview');
            const imgElement = document.createElement('img');
            imgElement.height = 150;
            imgElement.src = fr.result;
            previewElemenet.appendChild(imgElement);
        }
        fr.readAsDataURL(files[0]);
    }
    else {
        alert("No support for files...")
    }
}

/* Checking all input values on any change */

function onChangeVorname(input) {
    const value = input.value;
    const previewElemenet = document.getElementById('vorname-preview');
    previewElemenet.innerHTML = value;
}

function onChangeNachname(input) {
    const value = input.value;
    const previewElemenet = document.getElementById('nachname-preview');
    previewElemenet.innerHTML = value;
}

function onChangeDescriptionText(input) {
    const value = input.value;
    const previewElemenet = document.getElementById('description-text-preview');
    previewElemenet.innerHTML = value;
}

function onChangePhone(input) {
    const value = input.value;
    const container = document.getElementById('phone-container');
    const previewElemenet = document.getElementById('phone-preview');
    previewElemenet.innerHTML = value;

    if(value === '') {
        container.style = "display: none;";
    }
    else {
        container.style = "display: flex; flex-direction: row;";
    }
}

function onChangeEmail(input) {
    const value = input.value;
    const container = document.getElementById('email-container');
    const previewElemenet = document.getElementById('email-preview');
    previewElemenet.innerHTML = value;

    if(value === '') {
        container.style = "display: none;";
    }
    else {
        container.style = "display: flex; flex-direction: row;";
    }
}

function onChangeCountry(input) {
    const value = input.value;
    const container = document.getElementById('country-container');
    const previewElemenet = document.getElementById('country-preview');
    previewElemenet.innerHTML = value;

    if(value === '') {
        container.style = "display: none;";
    }
    else {
        container.style = "display: flex; flex-direction: row;";
    }
}

function onChangeDOB(input) {
    const value = input.value;
    const container = document.getElementById('dob-container');
    const previewElemenet = document.getElementById('dob-preview');
    const pobInput = document.getElementById('pob-input');
    const previewValue = value + " in " + pobInput.value;
    previewElemenet.innerHTML = previewValue;

    if(value === '' && pobInput.value === '') {
        container.style = "display: none;";
    }
    else {
        container.style = "display: flex; flex-direction: row;";
    }
}

function onChangePOB(input) {
    const value = input.value;
    const container = document.getElementById('dob-container');
    const previewElemenet = document.getElementById('dob-preview');
    const dobInput = document.getElementById('dob-input');
    const previewValue = dobInput.value + " in " + value;
    previewElemenet.innerHTML = previewValue;

    if(value === '' && dobInput.value === '') {
        container.style = "display: none;";
    }
    else {
        container.style = "display: flex; flex-direction: row;";
    }
}

function onChangeAdresse(input) {
    const container = document.getElementById('adress-container');
    const value = input.value;
    const plzInput = document.getElementById('plz-input');
    const cityInput = document.getElementById('city-input');
    const previewElemenet = document.getElementById('adress-preview');
    const previewValue = value + ", " + plzInput.value + " " + cityInput.value;
    previewElemenet.innerHTML = previewValue;
    if(value === '' && plzInput.value === '' && cityInput.value === '') {
        container.style = "display: none;";
    }
    else {
        container.style = "display: flex; flex-direction: row;";
    }
}

function onChangePLZ(input) {
    const container = document.getElementById('adress-container');
    const value = input.value;
    const adressInput = document.getElementById('adress-input');
    const cityInput = document.getElementById('city-input');
    const previewElemenet = document.getElementById('adress-preview');
    const previewValue = adressInput.value + ", " + value + " " + cityInput.value;
    previewElemenet.innerHTML = previewValue;
    if(value === '' && adressInput.value === '' && cityInput.value === '') {
        container.style = "display: none;";
    }
    else {
        container.style = "display: flex; flex-direction: row;";
    }
}

function onChangeCity(input) {
    const container = document.getElementById('adress-container');
    const value = input.value;
    const adressInput = document.getElementById('adress-input');
    const plzInput = document.getElementById('plz-input');
    const previewElemenet = document.getElementById('adress-preview');
    const previewValue = adressInput.value + ", " + plzInput.value + " " + value;
    previewElemenet.innerHTML = previewValue;
    if(value === '' && adressInput.value === '' && plzInput.value === '') {
        container.style = "display: none;";
    }
    else {
        container.style = "display: flex; flex-direction: row;";
    }
}

function onChangeSpecialization(input) {
    const elements = input.id.split('-');
    let value = input.value;
    let originalValue = value;
    const id = elements[elements.length - 1];
    const degreeContainer = document.getElementById('degree-container-' + id);
    if(degreeContainer.innerHTML !== ""){
        // console.log(value)
    }
    value = "&nbsp;" + value;
    const educationContainer = document.getElementById('education-container-' + id);
    const container = document.getElementById('specialization-container-' + id);
    const universityValue = document.getElementById('university-1').value;
    const degreeValue = document.getElementById('degree-1').value;
    if(originalValue == "" && universityValue == "" && degreeValue == "") {
        educationContainer.style = "display: none;";
        return;
    }
    educationContainer.style = "display: flex; flex-direction: row; justify-content: space-between; padding: 5px 0; font-size: 10px;";
    container.innerHTML = value;
}

function onChangeUniversity(input) {
    const elements = input.id.split('-');
    const value = input.value;
    const id = elements[elements.length - 1];
    const educationContainer = document.getElementById('education-container-' + id);
    const container = document.getElementById('university-container-' + id);
    const degreeValue = document.getElementById('degree-1').value;
    const specializationValue = document.getElementById('specialization-1').value;
    if(value == "" && degreeValue == "" && specializationValue == "") {
        educationContainer.style = "display: none;";
        return;
    }
    educationContainer.style = "display: flex; flex-direction: row; justify-content: space-between; padding: 5px 0; font-size: 10px;";
    container.innerHTML = value;
}

function onChangeDegree(input) {
    const elements = input.id.split('-');
    let value = input.value;
    if(value !== ""){
        value += " in";
    }
    const id = elements[elements.length - 1];
    const educationContainer = document.getElementById('education-container-' + id);
    const container = document.getElementById('degree-container-' + id);
    const universityValue = document.getElementById('university-1').value;
    const specializationValue = document.getElementById('specialization-1').value;
    if(value == "" && universityValue == "" && specializationValue == "") {
        educationContainer.style = "display: none;";
        return;
    }
    educationContainer.style = "display: flex; flex-direction: row; justify-content: space-between; padding: 5px 0; font-size: 10px;";
    container.innerHTML = value;
}

function onChangeEducationStart(input) {
    const value = input.value.substring(0,4);
    const elements = input.id.split('-');
    const id = elements[elements.length - 1];
    const container = document.getElementById('education-timespan-' + id);
    const endYear = document.getElementById('education-end-' + id).value.substring(0,4);
    const educationContainer = document.getElementById('education-container-' + id);
    educationContainer.style = "display: flex; flex-direction: row; justify-content: space-between; padding: 5px 0; font-size: 10px;";
    if(endYear != null){
        container.innerHTML = value + " - " + endYear;
    }
    else {
        container.innerHTML = value + " - ";
    }
}

function onChangeEducationEnd(input) {
    const value = input.value.substring(0,4);
    const elements = input.id.split('-');
    const id = elements[elements.length - 1];
    const container = document.getElementById('education-timespan-' + id);
    const startYear = document.getElementById('education-start-' + id).value.substring(0,4);
    const educationContainer = document.getElementById('education-container-' + id);
    educationContainer.style = "display: flex; flex-direction: row; justify-content: space-between; padding: 5px 0; font-size: 10px;";
    if(startYear != null){
        container.innerHTML = startYear + " - " + value;
    }
    else{
        container.innerHTML = " - " + value;
    }
}

function onChangeJobTitle(input) {
    const elements = input.id.split('-');
    let value = input.value;
    const id = elements[elements.length - 1];
    const experienceContainer = document.getElementById('experience-container-' + id);
    const container = document.getElementById('job-title-container-' + id);
    const employerValue = document.getElementById('employer-' + id).value;
    if(value == "" && employerValue == "") {
        experienceContainer.style = "display: none;";
        return;
    }
    experienceContainer.style = "display: flex; flex-direction: row; justify-content: space-between; padding: 5px 0; font-size: 10px;";
    container.innerHTML = value;
}

function onChangeEmployer(input) {
    const elements = input.id.split('-');
    const value = input.value;
    const id = elements[elements.length - 1];
    const experienceContainer = document.getElementById('experience-container-' + id);
    const container = document.getElementById('employer-container-' + id);
    const jobTitleValue = document.getElementById('job-title-' + id).value;
    if(value == "" && jobTitleValue == "") {
        experienceContainer.style = "display: none;";
        return;
    }
    experienceContainer.style = "display: flex; flex-direction: row; justify-content: space-between; padding: 5px 0; font-size: 10px;";
    container.innerHTML = value;
}

function onChangeWorkArea(input) {

}

function onChangeCareerLevel(input) {

}

function onChangeExperienceStart(input) {
    const value = input.value.substring(0,4);
    const elements = input.id.split('-');
    const id = elements[elements.length - 1];
    const container = document.getElementById('experience-timespan-' + id);
    const endYear = document.getElementById('experience-end-' + id).value.substring(0,4);
    const experienceContainer = document.getElementById('experience-container-' + id);
    experienceContainer.style = "display: flex; flex-direction: row; justify-content: space-between; padding: 5px 0; font-size: 10px;";
    if(endYear != null){
        container.innerHTML = value + " - " + endYear;
    }
    else {
        container.innerHTML = value + " - ";
    }
}

function onChangeExperienceEnd(input) {
    const value = input.value.substring(0,4);
    const elements = input.id.split('-');
    const id = elements[elements.length - 1];
    const container = document.getElementById('experience-timespan-' + id);
    const startYear = document.getElementById('experience-start-' + id).value.substring(0,4);
    const experienceContainer = document.getElementById('experience-container-' + id);
    experienceContainer.style = "display: flex; flex-direction: row; justify-content: space-between; padding: 5px 0; font-size: 10px;";
    if(startYear != null){
        container.innerHTML = startYear + " - " + value;
    }
    else{
        container.innerHTML = " - " + value;
    }
}

function onChangeBranch(input) {
}

function onChangeTask(input) {
    const value = input.value;
    const elements = input.id.split('-');
    const id = elements[elements.length - 1];
    const listCount = elements[1];
    const container = document.getElementById('task-list-' + id);
    const previewListCount = container.childNodes.length;
    const idValue = "task-element-" + listCount + "-" + id;

    if (listCount > previewListCount) {
        const liElement = document.createElement('li');
        liElement.innerHTML = value;
        liElement.id = idValue;
        container.append(liElement);
    }
    else {
        const liElement = document.getElementById(idValue);
        liElement.innerHTML = value;
    }
}

function onChangeSkills(input, event) {
    const skill = input.value;
    const previewContainer = document.getElementById('preview-skills-container');
    const container = document.getElementById('skill-location');
    const skillElement = document.createElement('div');
    skillElement.classList.add("skill-element");
    const text = document.createElement('div');
    text.innerHTML = skill;
    const icon = document.createElement('div');
    icon.innerHTML = '✓';
    icon.id = 'icon';
    skillElement.append(text);
    skillElement.append(icon);
    skillElement.addEventListener("mouseenter", () => {
        changeIconOnEnter(skillElement)
    });
    skillElement.addEventListener("mouseleave", () => {
        changeIconOnLeave(skillElement)
    });
    const div = document.createElement('div');
    div.innerHTML = skill;

    if(event.keyCode === 13) {
        input.value = "";
        container.append(skillElement);
        previewContainer.append(div);
    }
}



/* Checking the input fiels on DOMContentLoaded */

function checkAdress() {
    const input = document.getElementById('adress-input');
    const container = document.getElementById('adress-container');
    if(input.value === '') {
        container.style = "display: none;";;
    }
}

function checkCountry() {
    const input = document.getElementById('country-input');
    const container = document.getElementById('country-container');
    if(input.value === '') {
        container.style = "display: none;";;
    }
}

function checkPhone() {
    const input = document.getElementById('phone-input');
    const container = document.getElementById('phone-container');
    if(input.value === '') {
        container.style = "display: none;";;
    }
}

function checkEmail() {
    const input = document.getElementById('email-input');
    const container = document.getElementById('email-container');
    if(input.value === '') {
        container.style = "display: none;";;
    }
}

function checkDOB() {
    const input = document.getElementById('dob-input');
    const container = document.getElementById('dob-container');
    if(input.value === '') {
        container.style = "display: none;";
    }
}

function checkEducation() {
    const elements = document.querySelectorAll('.education-details-container');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style = "display: none;";
    }
}

function checkExperience() {
    const elements = document.querySelectorAll('.experience-details-container');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style = "display: none;";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    checkAdress();
    checkCountry();
    checkPhone();
    checkEmail();
    checkDOB();
    checkEducation();
    checkExperience();
});

/* Other functions */

function addTask(input) {
    const parentElement = input.parentElement;
    const elements = parentElement.className.split("-");
    const id = elements[elements.length - 1];
    const element = document.getElementById('add-task-location-' + id);
    const listCount = document.getElementById('task-list-' + id).childNodes.length + 1;
    const string = `<div class='form-items-container' id="add-task-location-${id}">
    <input type='text' name='Meine Kernaufgaben' placeholder='Meine Kernaufgaben' id='task-${listCount}-${id}' onkeypress='onChangeTask(this)' onkeyup='onChangeTask(this)'>
    <button onclick='removeTask(this)'>(-)</button>
    </div>`;
    element.insertAdjacentHTML('afterend', string);
}

function removeTask(input) {
    const parent = input.parentElement;
    parent.remove();
}

function addEducation() {
    const element = document.getElementById('add-education');
    const id = (document.querySelectorAll('.education-item').length / 4) + 1;
    const string = `<div class="form-items-container education-item education-${id}">
    <input type="text" name="Fachrichtung" placeholder="Fachrichtung" id="specialization-${id}" onkeypress="onChangeSpecialization(this)" onkeyup="onChangeSpecialization(this)">
    </div>
    <div class="form-items-container education-item education-${id}">
        <input type="text" name="Hochschule" placeholder="Hochschule" id="university-${id}" onkeypress="onChangeUniversity(this)" onkeyup="onChangeUniversity(this)">
    </div>
    <div class="form-items-container education-item education-${id}">
        <input type="text" name="Abschluss" placeholder="Abschluss" id="degree-${id}" onkeypress="onChangeDegree(this)" onkeyup="onChangeDegree(this)">
    </div>
    <div class="form-items-container education-item education-${id}">
        <input type="date" name="Start-Datum" placeholder="Start-Datum" id="education-start-${id}" onchange="onChangeEducationStart(this)" onkeyup="onChangeEducationStart(this)">
        <input type="date" name="End-Datum" placeholder="End-Datum" id="education-end-${id}" onchange="onChangeEducationEnd(this)" onkeyup="onChangeEducationEnd(this)">
    </div>
    <div class="form-items-container education-${id}" id="remove-education-${id}">
        <button onclick="removeEducation(this)">Ausbildung löschen (-)</button>
    </div>`;
    element.insertAdjacentHTML('beforebegin', string);
}

function removeEducation(input) {
    const elements = input.parentElement.id.split("-");
    const id = elements[elements.length - 1];
    const elementsToRemove = document.querySelectorAll(".education-" + id);
    elementsToRemove.forEach(element => element.remove());
}

function addExperience() {
    const element = document.getElementById('add-experience');
    const id = (document.querySelectorAll('.experience-item').length / 5) + 1;
    const listCount = document.getElementById('task-list-' + id).childNodes.length + 1;
    const string = ` <div class="form-items-container experience-item experience-${id}">
    <input type="text" name="Job-Titel" placeholder="Job-Titel" id="job-title-${id}" onkeypress="onChangeJobTitle(this)" onkeyup="onChangeJobTitle(this)">
    </div>
    <div class="form-items-container experience-item experience-${id}">
        <input type="text" name="Arbeitgeber" placeholder="Arbeitgeber" id="employer-${id}" onkeypress="onChangeEmployer(this)" onkeyup="onChangeEmployer(this)">
    </div>
    <div class="form-items-container experience-item experience-${id}">
    <select name="Branche" id="branch-${id}" onchange="onChangeBranch(this)">
        <option value="Branche" disabled selected>Branche</option>
        <option value="Architektur, Bauwesen">Architektur, Bauwesen</option>
        <option value="Automobil- und Fahrzeugbau">Automobil- und Fahrzeugbau</option>
        <option value="Banken, Finanzdienstleistungen">Banken, Finanzdienstleistungen</option>
        <option value="Beratung, Consulting">Beratung, Consulting</option>
        <option value="Energie, Wasser, Umwelt">Energie, Wasser, Umwelt</option>
        <option value="Erziehung, Bildung, Wissenschaft">Erziehung, Bildung, Wissenschaft</option>
        <option value="Gesundheit, Soziales">Gesundheit, Soziales</option>
        <option value="Immobilien">Immobilien</option>
        <option value="Industrie und Maschinenbau">Industrie und Maschinenbau</option>
        <option value="Internet, IT">Internet, IT</option>
        <option value="Konsumgüter, Handel">Konsumgüter, Handel</option>
        <option value="Kunst, Kultur, Sport">Kunst, Kultur, Sport</option>
        <option value="Marketing, PR und Design">Marketing, PR und Design</option>
        <option value="Medien, Verlage">Medien, Verlage</option>
        <option value="Personaldienstleistungen">Personaldienstleistungen</option>
        <option value="Pharma, Medizintechnik">Pharma, Medizintechnik</option>
        <option value="Sonstige Branchen">Sonstige Branchen</option>
        <option value="Telekommunikation">Telekommunikation</option>
        <option value="Tourismus, Gastronomie">Tourismus, Gastronomie</option>
        <option value="Transport, Logistik">Transport, Logistik</option>
        <option value="Versicherungen">Versicherungen</option>
        <option value="Wirtschaftsprüfung, Steuern, Recht">Wirtschaftsprüfung, Steuern, Recht</option>
        <option value="Öffentlicher Dienst, Verbände und Einrichtungen">Öffentlicher Dienst, Verbände und Einrichtungen</option>
    </select>
    </div>
    <div class="form-items-container experience-item experience-${id}">
        <input type="text" name="Tätigkeitsfeld" placeholder="Tätigkeitsfeld" id="work-area-${id}" onkeypress="onChangeWorkArea(this)" onkeyup="onChangeWorkArea(this)">
        <input type="text" name="Karriere-Stufe" placeholder="Karriere-Stufe" id="career-level-${id}" onkeypress="onChangeCareerLevel(this)" onkeyup="onChangeCareerLevel(this)">
    </div>
    <div class="form-items-container experience-item experience-${id}" id="add-task-${id}">
        <input type="date" name="Start-Datum" placeholder="Start-Datum" id="experience-start-${id}" onchange="onChangeExperienceStart(this)" onkeyup="onChangeExperienceStart(this)">
        <input type="date" name="End-Datum" placeholder="End-Datum" id="experience-end-${id}" onchange="onChangeExperienceEnd(this)" onkeyup="onChangeExperienceEnd(this)">
    </div>
    <div class="form-items-container experience-${id}" id="add-task-location-${id}">
        <input type="text" name="Meine Kernaufgaben" placeholder="Meine Kernaufgaben" onkeypress="onChangeTask(this)" onkeyup="onChangeTask(this)" id="task-${listCount}-${id}">
        <button onclick="removeTask(this)">(-)</button>
    </div>
    <div class="form-items-container experience-${id}" style="justify-content: end;">
        <button onclick="addTask(this)">Kernaufgabe hinzufügen (+)</button>
    </div>
    <div class="form-items-container experience-${id}">
        <button onclick="removeExperience(this)">Erfahrung entfernen (-)</button>
    </div>`;
    element.insertAdjacentHTML('beforebegin', string);
}

function removeExperience(input) {

}

function changeIconOnEnter(input) {
    const element = Array.from(input.childNodes).find(element => element.id === "icon");
    element.innerHTML = "X";
}

function changeIconOnLeave(input) {
    const element = Array.from(input.childNodes).find(element => element.id === "icon");
    element.innerHTML = "✓";
}

function generatePDF() {
    window.print();
}