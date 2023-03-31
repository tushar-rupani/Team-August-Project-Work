var connection = require("../connection/connection");
let path = require('path');
let fs = require('fs');
let sharp = require('sharp');
let jwt = require('jsonwebtoken');

const saveData = async (req, res) => {
    let data = JSON.parse(req.body.data);
    let photos = req.files;

    let uncompressed_files = photos.map((f) => f.filename);


    let upload_uncompressed_path = path.join(__dirname + "/../public/upload_uncompressed");
    let upload_compressed_path = path.join(__dirname + "/../public/upload_compressed");

    //upload compressed files =======
    try {

        uncompressed_files.forEach(async function (file) {
            let file_path = path.join(upload_uncompressed_path, "/" + file);
            let new_file_path = path.join(upload_compressed_path, "/" + file);
            let extension = path.extname(file);
            if (extension == ".png" || extension == ".jpg" || extension == ".jpeg") {
                await sharp(file_path).resize().jpeg({ quality: 50 }).toFile(new_file_path);
            }
        });

    } catch (err) {
        console.log(err);

    }



    let con = await connection.getConnection();

    try {

        await con.beginTransaction();
        let ID = Number(req.session.user);

        let { basic_details, contact_info, company_relation, document_info, social } = data;


        await con.execute(`insert into basic_information (employee_id,full_name,gender,birthdate,marital_status,allowed_wfh,profile_pic) values(${ID},'${basic_details.fullname}','${basic_details.gender}','${basic_details.dob}','${basic_details.m_status}',${Number(basic_details.wfh)},'${uncompressed_files[0]}')`);
        await con.execute(`insert into contact_information (employee_id,contact_no,emergency_contact,emergency_person_name,permenant_address,current_address) values(${ID},'${contact_info.contact}','${contact_info.emergency_contact}','${contact_info.emergency_person}','${contact_info.permanent_address}','${contact_info.current_address}')`);
        await con.execute(`insert into company_relation (employee_id,designation,department,join_date,probation_date) values(${ID},'${company_relation.designation}','${company_relation.department}','${company_relation.join_date}','${company_relation.probation_date}')`);
        await con.execute(`insert into documents (employee_id,aadhar_path,pancard_path,cheque_path,resume_path,aadhar_no,pancard_no,cheque_no) values(${ID},'${uncompressed_files[1]}','${uncompressed_files[2]}','${uncompressed_files[3]}','${uncompressed_files[4]}','${document_info.aadhar_number}','${document_info.pan_num}','${document_info.cheque_num}')`);
        await con.execute(`insert into social_information (employee_id,twitter,linkedin,github,facebook) values(${ID},'${social.twitter}','${social.linkedin}','${social.github}','${social.facebook}')`);
        await con.execute(`insert into status (employee_id) values(${ID})`);
        const user = jwt.sign(ID, "JWT_SECRET");
        res.cookie("user", user);
        res.status(200).json({ msg: "data Stored", status: 200 });


        await con.commit();



    } catch (err) {
        if (con) {
            await con.rollback();
        }
        console.log(err);
        res.status(500).json({ msg: "Somethig went wrong", status: 500 });
    } finally {
        if (con) {
            con.release();
        }
    }


}

const renderForm = async (req, res) => {

    let con = await connection.getConnection();
    let ID = Number(req.session.user);

    let emp_id = req.session.user;

    let check_emp_details = `select * from basic_information where employee_id = '${emp_id}'`;
    try {
        let [hasData] = await connection.execute(check_emp_details);
        if (hasData.length !== 0) {
            return res.redirect("/self/home")
        }

    } catch (e) {
        console.log(e);
    }

    let email = await con.execute(`select email from register where id = ${ID}`);
    res.render('employee_form', { email: email });
}

const updateData = async (req, res) => {

    let ID = Number(req.session.user);

    let data = JSON.parse(req.body.data);
    let photos = req.files;
    
    let query = `SELECT profile_pic from basic_information where employee_id = ${ID}`;
    let [executeQuery] = await connection.execute(query);
    console.log("executeQuery", executeQuery);
    let selectImage;

    let uncompressed_files = photos.map((f) => f.filename);

    console.log("uncompressed", uncompressed_files);
    if(uncompressed_files.length == 0){
        selectImage = executeQuery[0].profile_pic;
    }else{
        selectImage = uncompressed_files[0]
    }

    let upload_uncompressed_path = path.join(__dirname + "/../public/upload_uncompressed");
    let upload_compressed_path = path.join(__dirname + "/../public/upload_compressed");

    //upload compressed files =======
    try {

        uncompressed_files.forEach(async function (file) {
            let file_path = path.join(upload_uncompressed_path, "/" + file);
            let new_file_path = path.join(upload_compressed_path, "/" + file);
            let extension = path.extname(file);
            if (extension == ".png" || extension == ".jpg" || extension == ".jpeg") {
                await sharp(file_path).resize().jpeg({ quality: 50 }).toFile(new_file_path);
            }
        });

    } catch (err) {
        console.log(err);

    }



    let con = await connection.getConnection();

    try {

        await con.beginTransaction();

        let { basic_details, contact_info, company_relation, document_info, social } = data;

        sql1 = `update basic_information set full_name = '${basic_details.fullname}',gender='${basic_details.gender}',birthdate='${basic_details.dob}',marital_status='${basic_details.m_status}',allowed_wfh=${Number(basic_details.wfh)},profile_pic= '${selectImage}' where employee_id=${ID}`
        await con.execute(sql1);
        sql2 = `update contact_information set  contact_no = '${contact_info.contact}',emergency_contact='${contact_info.emergency_contact}',emergency_person_name='${contact_info.emergency_person}',permenant_address='${contact_info.permanent_address}',current_address='${contact_info.current_address}' where employee_id=${ID}`
        await con.execute(sql2);
        sql3 = `update company_relation set  designation = '${company_relation.designation}',department='${company_relation.department}',join_date='${company_relation.join_date}',probation_date='${company_relation.probation_date}' where employee_id=${ID}`
        await con.execute(sql3);
        // sql4 = `update documents set  aadhar_path = '${uncompressed_files[1]}',pancard_path='${uncompressed_files[2]}',cheque_path='${uncompressed_files[3]}',resume_path='${uncompressed_files[4]}', aadhar_no='${document_info.aadhar_number}',pancard_no='${document_info.pan_num}', cheque_no='${document_info.cheque_num}' where employee_id=${ID}`
        // await con.execute(sql4);
        sql5 = `update social_information set  twitter = '${social.twitter}',linkedin='${social.linkedin}',github='${social.github}',facebook='${social.facebook}'  where employee_id=${ID}`
        
        await con.execute(sql5);


        // console.log(basic_details);
        const user = jwt.sign(ID, "JWT_SECRET");
        res.cookie("user", user);
        // res.redirect('/profile');
        res.status(200).json({ msg: "data Stored", status: 200 });

        await con.commit();


    } catch (err) {
        if (con) {
            await con.rollback();
        }
        console.log(err);
        res.status(500).json({ msg: "Something went wrong", status: 500 });
    } finally {
        if (con) {
            con.release();
        }
    }

}


module.exports = { saveData, renderForm, updateData };

