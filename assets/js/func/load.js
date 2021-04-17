function load() {
    let name = $("#name").val();

    $.ajax({
        type        : "GET",
        url         : "app/index.php?thread=" + name,
        beforeSend: function() {
            // setting a timeout
        },
    }).done(function(data) {
        THREAD = JSON.parse(data).data;
        $("#name").val(THREAD.name);
        $("#version").val(THREAD.version);
        $("#description").val(THREAD.description);
        for (let v in VERSIONS){
            let supported = THREAD.supportedVersions[v].supported;

            if("true" == supported){
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
    });
}
