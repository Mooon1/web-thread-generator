function createCommandFormWithValues(command, desc, perm) {
    $("#commands-form").append('<div class="col-12">\n' +
        '                                <input type="text" id="command-' + COMMANDS + '" value="' + command + '" style="width:100%;">\n' +
        '                                <input type="text" id="command-permission-' + COMMANDS + '" value="' + perm + '" style="width:100%;">\n' +
        '                                <textarea id="command-desc-' + COMMANDS + '">' + desc + '</textarea>\n' +
        '                            </div>');
    COMMANDS++;
    $("#commands-counter").html(COMMANDS);
}

function createCommandForm() {
    $("#commands-form").append('<div class="col-12">\n' +
        '                                <input type="text" id="command-' + COMMANDS + '" placeholder="/example <uuid> <itemid> <amount>" style="width:100%;">\n' +
        '                                <input type="text" id="command-permission-' + COMMANDS + '" placeholder="plugin.command.example" style="width:100%;">\n' +
        '                                <textarea id="command-desc-' + COMMANDS + '" style="width:100%;height:100px;" placeholder="Describe the usage of the commands."></textarea>\n' +
        '                            </div>');
    COMMANDS++;
    $("#commands-counter").html(COMMANDS);
}

function createFeatureForm() {
    $("#featuers-form").append('<div class="col-12">\n' +
        '                                <input type="text" id="feature-' + FEATURES + '" placeholder="Name your feature" style="width:100%;">\n' +
        '                                <textarea id="feature-desc-' + FEATURES + '" style="width:100%;height:100px;" placeholder="Describe the feature."></textarea>\n' +
        '                            </div>');
    FEATURES++;
    $("#features-counter").html(FEATURES);
}

function createFeatureFormWithValues(title, desc) {
    $("#featuers-form").append('<div class="col-12">\n' +
        '                                <input type="text" id="feature-' + FEATURES + '" value="' + title + '" style="width:100%;">\n' +
        '                                <textarea id="feature-desc-' + FEATURES + '" style="width:100%;height:100px;">' + desc + '</textarea>\n' +
        '                            </div>');
    FEATURES++;
    $("#features-counter").html(FEATURES);
}
