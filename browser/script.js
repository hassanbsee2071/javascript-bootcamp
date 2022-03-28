// enable tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

const makePostRequest =(reqBody)=> {
    apiURL = "https://onboarding-api.eks-migeneral-us-east-1.container.spglobal.com/"

    fetch(apiURL, {
    body: JSON.stringify(reqBody),
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    method: "POST"
    })
    .then(response => {
        if (response.status != 200) {
            console.log(response.json())
            throw "Response error. Please check backend logs."
        } else {
            response.json()
        }
    })
    .then(data => {
        console.log('Success:', data);
        document.getElementById("theForm").style.display = "none";
        document.getElementById("successMessage").style.display = "inline-block";
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById("submitButton").disabled = false;
        document.getElementById("spinner").style.display = "none";
        document.getElementById("errorMessage").style.display = "inline-block";
    });
}

const compileInput =()=> {

    const shortNames = {
        "Market Intelligence": "spgmi",
        "SPG Platform": "spgp",
        "Dow Jones Indices": "spdji",
        "Platts": "platts",
        "Ratings": "ratings",
        "Corporate": "corp"
    }

    // store input values
  
  
    let teamName = document.getElementById("teamName").value
    let teamContact = document.getElementById("teamContact").value + document.getElementById("teamEmailDomain").value
    let submitterContact = document.getElementById("submitterContact").value + "@spglobal.com"
    let clusterName = document.getElementById("clusterName").value
    let region = document.getElementById("region").value
    let namespace = document.getElementById("namespace").value + "-ns"
    let limitCPU = document.getElementById("limitCPU").value
    let requestCPU = document.getElementById("requestCPU").value
    let limitMemory = document.getElementById("limitMemory").value + document.getElementById("limitMemoryUnit").value
    let requestMemory = document.getElementById("requestMemory").value + document.getElementById("requestMemoryUnit").value
    let limitStorage = document.getElementById("limitStorage").value + document.getElementById("limitStorageUnit").value
    let requestStorage = document.getElementById("requestStorage").value + document.getElementById("requestStorageUnit").value
   


    // format as json
    let body = {
        "definitionId": "5",
        "description": teamName + " Resource Quota Request" ,
        "reason":"none",
        "name": teamName + " Resource Quota Request",
        "variables":{
            "CLUSTER_NAME":{"value": clusterName},
            "REGION":{"value": region},
            "NAMESPACE":{"value": namespace},
            "LIMIT_CPU":{"value": limitCPU},
            "LIMIT_MEM":{"value": limitMemory},
            "LIMIT_STORAGE":{"value": limitStorage},
            "REQUEST_CPU":{"value": requestCPU},
            "REQUEST_MEM":{"value": requestMemory},
            "REQUEST_STORAGE":{"value": requestStorage},
            "TEAM_NAME":{"value": teamName},
            "TEAM_CONTACT":{"value": teamContact},
            "SUBMITTER_CONTACT":{"value": submitterContact},
            "PLATFORM_OWNER_EMAIL":{"value": "PLATFORM OWNER EMAIL HERE!"},
            "PLATFORM_OWNER_NAME":{"value": "PLATFORM OWNER NAME HERE!"}
          }
        }
    return body
}

const validateInput =()=> {

    everythingValid = true
    document.getElementById("rqLogicError").style.display = "none"
    let mainReg = /^[a-z]+(-[a-z]+)*$/g
    let noWhiteSpaceReg = /\S/g

    // ensure people don't submit email addresses ending with @spglobal.com or @snl.int or @snl.com
    let emailRegNew = /^[a-zA-Z 0-9\.]*$/g
    let emailRegNewSubmitter = /^[a-zA-Z 0-9\.]*$/g


    // ensure people don't submit namespace ending with '-ns'
    let namespaceReg = /^[a-z]+(-[a-z]+)*$/g
    let namespaceEndReg = /^(?!.*\-ns$).*$/g

    // check team name
    if (mainReg.test(document.getElementById("teamName").value)) {
        document.getElementById("teamNameError").style.display = "none"
    } else {
        document.getElementById("teamNameError").style.display = "block"
        everythingValid = false
    }

 
    
    // check team contact info
    if (noWhiteSpaceReg.test(document.getElementById("teamContact").value) &&
       emailRegNew.test(document.getElementById("teamContact").value)) {
        console.log("team input valid: " + document.getElementById("teamContact").value)
        document.getElementById("teamContactError").style.display = "none"
    } else {
        console.log("team input invalid: " + document.getElementById("teamContact").value)
        document.getElementById("teamContactError").style.display = "block"
        everythingValid = false
    }

    // check submitter contact info
    if (noWhiteSpaceReg.test(document.getElementById("submitterContact").value) && 
       emailRegNewSubmitter.test(document.getElementById("submitterContact").value)) {
        console.log("submitter input valid: " + document.getElementById("submitterContact").value)
        document.getElementById("submitterContactError").style.display = "none"
    } else {
        document.getElementById("submitterContactError").style.display = "block"
        console.log("submitter input invalid: " + document.getElementById("submitterContact").value)
        everythingValid = false
    }

    // check namespace
    if (namespaceReg.test(document.getElementById("namespace").value) && namespaceEndReg.test(document.getElementById("namespace").value)) {
        document.getElementById("namespaceError").style.display = "none"
    } else {
        document.getElementById("namespaceError").style.display = "block"
        everythingValid = false
    }
    
    // check limit & req CPU
    if (/^[0-9]+$/g.test(document.getElementById("limitCPU").value)) {
        document.getElementById("limitCPUError").style.display = "none"
    } else {
        document.getElementById("limitCPUError").style.display = "block"
        everythingValid = false
    }
    if (/^[0-9]+$/g.test(document.getElementById("requestCPU").value)) {
        document.getElementById("requestCPUError").style.display = "none"
    } else {
        document.getElementById("requestCPUError").style.display = "block"
        everythingValid = false
    }
    if (parseInt(document.getElementById("requestCPU").value) > parseInt(document.getElementById("limitCPU").value)) {
        document.getElementById("rqLogicError").style.display = "block"
        everythingValid = false
    }

    // check limit & req Mem
    if (/^[0-9]+$/g.test(document.getElementById("limitMemory").value)) {
        document.getElementById("limitMemoryError").style.display = "none"
    } else {
        document.getElementById("limitMemoryError").style.display = "block"
        everythingValid = false
    }
    if (/^[0-9]+$/g.test(document.getElementById("requestMemory").value)) {
        document.getElementById("requestMemoryError").style.display = "none"
    } else {
        document.getElementById("requestMemoryError").style.display = "block"
        everythingValid = false
    }
    if (parseInt(document.getElementById("requestMemory").value) > parseInt(document.getElementById("limitMemory").value)) {
        document.getElementById("rqLogicError").style.display = "block"
        everythingValid = false
    }

    // check limit & req Storage
    if (/^[0-9]+$/g.test(document.getElementById("limitStorage").value)) {
        document.getElementById("limitStorageError").style.display = "none"
    } else {
        document.getElementById("limitStorageError").style.display = "block"
        everythingValid = false
    }
    if (/^[0-9]+$/g.test(document.getElementById("requestStorage").value)) {
        document.getElementById("requestStorageError").style.display = "none"
    } else {
        document.getElementById("requestStorageError").style.display = "block"
        everythingValid = false
    }
    if (parseInt(document.getElementById("requestStorage").value) > parseInt(document.getElementById("limitStorage").value)) {
        document.getElementById("rqLogicError").style.display = "block"
        everythingValid = false
    }

 

    return everythingValid
}

const submit =()=> { 
    let everythingValid = validateInput()
    if (everythingValid) {
      
            document.getElementById("submitButton").disabled = true;
            document.getElementById("validationErrorMessage").style.display = "none";
            document.getElementById("spinner").style.display = "inline-block";
            reqBody = compileInput()
            makePostRequest(reqBody)
        
    } else {
        document.getElementById("validationErrorMessage").style.display = "inline-block";
    }    
}

const setEnvsBasedOnClusterAndRegion =()=> {
    // get cluster and selection
    let clusterName = document.getElementById("clusterName").value
    let region = document.getElementById("region").value

    // get checkbox items
    let devBox = document.getElementById("devEnvCheckBox")
    let qaBox = document.getElementById("qaEnvCheckBox")
    let stageBox = document.getElementById("stageEnvCheckBox")
    let prodBox = document.getElementById("prodEnvCheckBox")

    // first enable and uncheck all checkboxes
    devBox.disabled = false
    qaBox.disabled = false
    stageBox.disabled = false
    prodBox.disabled = false

    devBox.checked = false
    qaBox.checked = false
    stageBox.checked = false
    prodBox.checked = false

    // disable and check boxes accordingly
    // MI Internal
    if (clusterName == "MIInternal") {
        if (region == "us-east-1") {
            qaBox.disabled = true
            devBox.checked = true
            stageBox.checked = true
            prodBox.checked = true
        } else if (region == "ap-southeast-1") {
            devBox.disabled = true
            qaBox.disabled = true
            stageBox.checked = true
            prodBox.checked = true
        } else if (region == "us-west-2") {
            devBox.disabled = true
            qaBox.disabled = true
            stageBox.disabled = true
            prodBox.disabled = true
        }
    // MI Platform
    } else if (clusterName == "MIPlatform") {
        if (region == "us-east-1") {
            qaBox.checked = true
            devBox.checked = true
            stageBox.checked = true
            prodBox.checked = true
        } else if (region == "ap-southeast-1") {
            devBox.disabled = true
            qaBox.disabled = true
            stageBox.checked = true
            prodBox.checked = true
        } else if (region == "us-west-2") {
            devBox.disabled = true
            qaBox.disabled = true
            stageBox.disabled = true
            prodBox.checked = true
        }
    // MI General
    } else if (clusterName == "MIGeneral") {
        if (region == "us-east-1") {
            devBox.checked = true
            qaBox.checked = true
            stageBox.checked = true
            prodBox.checked = true
        } else if (region == "ap-southeast-1") {
            devBox.disabled = true
            qaBox.disabled = true
            stageBox.checked = true
            prodBox.checked = true
        } else if (region == "us-west-2") {
            devBox.disabled = true
            qaBox.disabled = true
            stageBox.disabled = true
            prodBox.disabled = true
        }
    } else if (clusterName == "MIMarketplace") {
        if (region == "us-east-1") {
            devBox.checked = true
            qaBox.checked = true
            stageBox.checked = true
            prodBox.checked = true
        } else if (region == "ap-southeast-1") {
            devBox.disabled = true
            qaBox.disabled = true
            stageBox.disabled = true
            prodBox.disabled = true
        } else if (region == "us-west-2") {
            devBox.disabled = true
            qaBox.disabled = true
            stageBox.disabled = true
            prodBox.checked = true
        }
    }
} 

const setCpuRQValues =(reqVal, limitVal)=> {
    document.getElementById("requestCPU").value = reqVal
    document.getElementById("limitCPU").value = limitVal
}

const setMemRQValues =(reqVal, limitVal, reqUnit, limitUnit)=> {
    document.getElementById("requestMemory").value = reqVal
    document.getElementById("limitMemory").value = limitVal
    document.getElementById("requestMemoryUnit").value = reqUnit
    document.getElementById("limitMemoryUnit").value = limitUnit
}

const setStorageRQValues =(reqVal, limitVal, reqUnit, limitUnit)=> {
    document.getElementById("requestStorage").value = reqVal
    document.getElementById("limitStorage").value = limitVal
    document.getElementById("requestStorageUnit").value = reqUnit
    document.getElementById("limitStorageUnit").value = limitUnit
}

const disableAllRQInputs =(bool)=> {
    document.getElementById("limitCPU").disabled = bool
    document.getElementById("requestCPU").disabled = bool
    document.getElementById("limitMemory").disabled = bool
    document.getElementById("requestMemory").disabled = bool
    document.getElementById("limitStorage").disabled = bool
    document.getElementById("requestStorage").disabled = bool
    document.getElementById("requestMemoryUnit").disabled = bool
    document.getElementById("limitMemoryUnit").disabled = bool
    document.getElementById("requestStorageUnit").disabled = bool
    document.getElementById("limitStorageUnit").disabled = bool
}

const setCustomRQ =()=> {
    setCpuRQValues("", "")
    setMemRQValues("", "", "Mi", "Mi")
    setStorageRQValues("", "", "Mi", "Mi")
    disableAllRQInputs(false)
}





