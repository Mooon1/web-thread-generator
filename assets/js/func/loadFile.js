function loadFile() {
    let filelist = $('#localfile').prop('files');
    if(0 < filelist.length){
        let f = filelist[0];
        let reader = new FileReader();

        reader.readAsBinaryString(f);

        reader.onloadend = function(){
            THREAD = JSON.parse(reader.result);
            $("#name").val(THREAD.name);
            $("#version").val(THREAD.version);
            $("#description").val(THREAD.description);
            for (let v in VERSIONS){
                let supported = THREAD.supportedVersions[v].supported;
                console.log(supported);
                if(true  === supported){
                    $('#v_' + VERSIONS[v].replace(".", "_")).prop('checked', true);
                }else {
                    $('#v_' + VERSIONS[v].replace(".", "_")).prop('checked', false);
                }

                $("#label_v_" + VERSIONS[v].replace(".", "_")).val(THREAD.supportedVersions[v].version);
            }

            for(let c in THREAD.commands){
                let cmd = THREAD.commands[c];
                createCommandFormWithValues(cmd.command, cmd.description, cmd.permission);
            }

            for(let f in THREAD.features){
                let featr = THREAD.features[f];
                createFeatureFormWithValues(featr.title, featr.description);
            }

            finishThread(false);
        }
    }
}
