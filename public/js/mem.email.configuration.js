/*
 *
 *	SMH MediaPlatform Plugin
 *	
 *	MEM
 *
 *	7-3-2014
 */
//MEM constructor
function MEM() {}

//Global variables
var ApiUrl = "/apps/mem/v1.0/index.php?";
var validator;
var smtp_default, smtp_custom, smtp_authenticate;

//MEM prototype/class
MEM.prototype = {
    constructor: MEM,
    //Gets email configuration
    getConfig:function(){
        var sessData = {
            pid: sessInfo.pid,
            ks: sessInfo.ks
        }
    
        var reqUrl = ApiUrl+'action=get_email_config';
        
        $.ajax({
            cache:      false,
            url:        reqUrl,
            type:       'GET',
            data:       sessData,
            dataType:   'json',
            success:function(data) {
                $('#from_name').val(data['from_name']);
                $('#from_email').val(data['from_email']);
                smtp_default = (data['use_default'] == 1 || data['use_default'] == '1')? true : false;
                smtp_authenticate = (data['auth'] == 1 || data['auth'] == '1')? true : false;
                if(data['use_default'] == 1 || data['use_default'] == '1'){
                    $('#smtp_default').prop( "checked", true );
                    $('#smtp_custom').prop( "checked", false );
                    $('#smtp_server').attr('disabled','');
                    $('#smtp_port').attr('disabled','');
                    $('input[name="smtp_auth"]').attr('disabled','');
                    $('#smtp_pass').attr('disabled','');
                    $('input[name="smtp_secure"]').attr('disabled','');
                } else {
                    $('#smtp_default').prop( "checked", false );
                    $('#smtp_custom').prop( "checked", true );
                    $('#smtp_server').removeAttr('disabled');
                    $('#smtp_port').removeAttr('disabled');
                    $('input[name="smtp_auth"]').removeAttr('disabled');
                    $('input[name="smtp_secure"]').removeAttr('disabled');
                    $('#smtp_server').val(data['server']);
                    $('#smtp_port').val(data['port']);
                    if(data['auth'] == 1 || data['auth'] == '1'){
                        $('#smtp_auth_no').prop( "checked", false );
                        $('#smtp_auth_yes').prop( "checked", true );
                        $('#smtp_pass').removeAttr('disabled');
                        $('#smtp_pass').val(data['pass']);
                    } else {
                        $('#smtp_auth_no').prop( "checked", true );
                        $('#smtp_auth_yes').prop( "checked", false );
                        $('#smtp_pass').attr('disabled','');
                    }
                    if(!data['secure']){
                        $('#smtp_secure_no').prop( "checked", true );
                        $('#smtp_secure_tls').prop( "checked", false );
                        $('#smtp_secure_ssl').prop( "checked", false );
                    } else if(data['secure'] == 1){
                        $('#smtp_secure_no').prop( "checked", false );
                        $('#smtp_secure_tls').prop( "checked", true );
                        $('#smtp_secure_ssl').prop( "checked", false ); 
                    } else if(data['secure'] == 2){
                        $('#smtp_secure_no').prop( "checked", false );
                        $('#smtp_secure_tls').prop( "checked", false );
                        $('#smtp_secure_ssl').prop( "checked", true ); 
                    }
                }
            }
        });
    },
    //Saves Email Configuration
    saveConfig:function(){
        $('#config-form input[type="text"]').tooltipster({
            trigger: 'custom',
            onlyOne: false,
            position: 'right'
        });
        var validator = $("#config-form").validate({
            ignore: [],
            highlight: function(element, errorClass) {
                $(element).removeClass("valid").removeClass("error").addClass("validate-error");
            },        
            unhighlight: function(element, errorClass) {
                $(element).removeClass("valid").removeClass("validate-error");
            },
            errorPlacement: function (error, element) {
                $(element).tooltipster('update', $(error).text());
                $(element).tooltipster('show');
            },
            success: function (label, element) {
                $(element).tooltipster('hide');
            },
            rules:{  
                from_name:{
                    required: true
                },
                from_email:{
                    required: true,
                    email: true
                }
            },
            messages: {
                from_name:{
                    required: "Please enter a name"
                },
                from_email:{
                    required: "Please enter an email",
                    email: "Please enter a vaild email address"
                }              
            }
        }); 
        
        var valid = validator.form();
        if(valid){
            var from_name = $('#from_name').val();
            var from_email = $('#from_email').val();
            var use_default = (smtp_default)? 1 : 0;
            var smtp_server = $('#smtp_server').val();
            var smtp_port = $('#smtp_port').val();
            var smtp_auth = (smtp_authenticate)? 1 : 0;
            var smtp_pass = $('#smtp_pass').val();
            var smtp_secure = 0;
            if($('#smtp_secure_tls').is(':checked')){
                smtp_secure = 1;
            }
            if($('#smtp_secure_ssl').is(':checked')){
                smtp_secure = 2;
            }
            var sessData = {
                pid: sessInfo.pid,
                ks: sessInfo.ks,
                from_name: from_name,
                from_email: from_email,
                use_default: use_default,
                smtp_server: smtp_server,
                smtp_port: smtp_port,
                smtp_auth: smtp_auth,
                smtp_pass: smtp_pass,                
                smtp_secure: smtp_secure
            } 
            var reqUrl = ApiUrl+'action=update_email_config';
                    
            $.ajax({
                cache:      false,
                url:        reqUrl,
                type:       'GET',
                data:       sessData,
                dataType:   'json',
                beforeSend:function(){
                    $('#save_config').attr('disabled','');
                    $('.box #loading img').css('display','inline-block');
                },
                success:function(data) {
                    if(data['success']){
                        $('#save_config').removeAttr('disabled'); 
                        $('.box #loading img').css('display','none'); 
                        $('.box #pass-result').html('<span class="label label-success">Successfully saved!</span>');
                        setTimeout(function(){
                            $('.box #pass-result').empty();
                        },5000);                                                                              
                    }
                }
            }); 
        }
    },
    //Register all user actions
    registerActions:function(){
        $('.content').on('change', 'input[name="smtp_server"]' ,function(){
            smtp_default = $('#smtp_default').is(':checked')? true : false;
            smtp_custom = $('#smtp_custom').is(':checked')? true : false;
            if(smtp_default){
                $('#smtp_server').attr('disabled','');
                $('#smtp_port').attr('disabled','');
                $('#smtp_pass').attr('disabled' ,'');
                $('input[name="smtp_auth"]').attr('disabled','');
                $('input[name="smtp_secure"]').attr('disabled','');
            } else {
                $('#smtp_server').removeAttr('disabled');
                $('#smtp_port').removeAttr('disabled');
                smtp_authenticate = $('#smtp_auth_yes').is(':checked')? true : false;
                if(smtp_authenticate){
                    $('#smtp_pass').removeAttr('disabled');
                } else {
                    $('#smtp_pass').attr('disabled' ,'');
                }
                $('input[name="smtp_auth"]').removeAttr('disabled');
                $('input[name="smtp_secure"]').removeAttr('disabled');
            }
        });
        $('.content').on('change', 'input[name="smtp_auth"]' ,function(){
            smtp_authenticate = $('#smtp_auth_yes').is(':checked')? true : false;
            if(smtp_authenticate){
                $('#smtp_pass').removeAttr('disabled');
            } else {
                $('#smtp_pass').attr('disabled' ,'');
            }
        });
    }
}

// MEM on ready
$(document).ready(function(){
    smhMEM = new MEM();
    smhMEM.registerActions();
    smhMEM.getConfig();
});
