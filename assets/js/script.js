let VERSIONS = ['1.16', '1.15', '1.14', '1.13', '1.12', '1.11', '1.10', '1.9', '1.8'];

function createCommandForm() {
    let counter = parseInt($("#commands-counter").html());
    let html = $("#commands-form").html() + '<div class="col-12">\n' +
        '                                <input type="text" id="command-"' + counter + ' placeholder="/example <uuid> <itemid> <amount>" style="width:100%;">\n' +
        '                                <textarea id="command-desc-' + counter + '" style="width:100%;height:100px;" placeholder="Describe the usage of the commands."></textarea>\n' +
        '                            </div>';

    $("#commands-form").html(html);
    $("#commands-counter").html(counter+1);
};

function finishThread() {
    $("#d-name").html($("#d-name").html()+'<span>' + $("#name").val() + '</span>');
    $("#d-version").html($("#d-version").html()+'<span>' + $("#version").val() + '</span>');

    // if($("#v_1_16").prop('checked'))

    let supportedVersions = '';

    for (let v in VERSIONS){
        supportedVersions += $('#v_' + VERSIONS[v].replace(".", "_")).prop('checked') ? '<div class="col-1"><span class="badge bg-success">' + VERSIONS[v] + '</span></div>' : '<div class="col-1"><span class="badge bg-danger">' + VERSIONS[v] + '</span></div>';
    }

    $("#supported-versions").html(supportedVersions);
};
