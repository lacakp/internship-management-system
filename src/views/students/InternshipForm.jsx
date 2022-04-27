import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadInternship } from "../../redux/actions/student/internship";
import { loadState, removeState, saveState } from "../../helpers/Persist";
import Internshiphook from "./InternshipHook";
import { Outlet } from "react-router-dom";
const InternshipForm = () => {
  const dispatch = useDispatch();
  const {
    internType,
    setInternType,
    internWork,
    setInternWork,
    internCompanyName,
    setInternCompanyName,
    internContactWithName,
    setInternContactWithName,
    internContactWithPosition,
    setInternContactWithPosition,
    internContactWithPhone,
    setInternContactWithPhone,
    internProposeTo,
    setInternProposeTo,
    internPhone,
    setInternPhone,
    internHouseNumber,
    setInternHouseNumber,
    internRoad,
    setInternRoad,
    internSubDistrict,
    setInternSubDistrict,
    internDistrict,
    setInternDistrict,
    internProvince,
    setInternProvince,
    internPostCode,
    setInternPostCode,

    studentFormData,
    setStudentFormData,
    coStudentFormData,
    setCoStudentFormData,
    handleCoStudentFormChange,
    handleStudentFormChange,

    swaptextSubDistricts,
    showDropDownMenuSubDistricts,
    swaptextDistricts,
    showDropDownMenuDistricts,
    swaptextProvinces,
    showDropDownMenuProvinces,
    handleFormSave,

    fetchProvinces,
    showDropDownMenuProgram,
    swaptext,
    swaptextProgram,
    provinces,
    districts,
    subDistricts,
    showDropDownMenu,
  } = Internshiphook();

  const [coStudentMsg1, setCoStudentMsg1] = useState("");
  const [coStudentMsg2, setCoStudentMsg2] = useState("");
  const [coStudentMsg3, setCoStudentMsg3] = useState("");
  const [coStudentMsg4, setCoStudentMsg4] = useState("");

  useEffect(() => {
    const intern = loadState("internship");
    const sender = loadState("resume");
    const senderData = sender?.student;
    setStudentFormData({
      id: senderData?.id,
      firstName: senderData?.first_name,
      lastName: senderData?.last_name,
      email: senderData?.email,
      program: senderData?.program,
      phone: senderData?.phone,
    });
    const internCompanyData = intern?.Companies?.company;
    const internCompanyAddressData = intern?.Companies?.companyAddress;
    const internCoStudentData = intern?.CoStudentInternships;

    setInternType(internCompanyData?.type);
    setInternWork(internCompanyData?.activities);
    setInternCompanyName(internCompanyData?.name);
    setInternContactWithName(internCompanyData?.contact_person_name);
    setInternContactWithPosition(internCompanyData?.contact_person_position);
    setInternContactWithPhone(internCompanyData?.contact_person_phone);
    setInternProposeTo(internCompanyData?.propose_to);
    setInternPhone(internCompanyData?.phone);

    setInternHouseNumber(internCompanyAddressData?.house_number);
    setInternRoad(internCompanyAddressData?.road);
    setInternSubDistrict(internCompanyAddressData?.sub_district);
    setInternDistrict(internCompanyAddressData?.district);
    setInternProvince(internCompanyAddressData?.province);
    setInternPostCode(internCompanyAddressData?.post_code);
    const first = internCoStudentData[0];
    const second = internCoStudentData[1];
    const third = internCoStudentData[2];
    const fourth = internCoStudentData[3];
    setCoStudentFormData({
      firstPerson: {
        id: first?.id,
        studentId: first?.student_id,
        firstName: first?.first_name,
        lastName: first?.last_name,
        phone: first?.phone,
      },
      secondPerson: {
        id: second?.id,
        studentId: second?.student_id,
        firstName: second?.first_name,
        lastName: second?.last_name,
        phone: second?.phone,
      },
      thirdPerson: {
        id: third?.id,
        studentId: third?.student_id,
        firstName: third?.first_name,
        lastName: third?.last_name,
        phone: third?.phone,
      },
      fourthPerson: {
        id: fourth?.id,
        studentId: fourth?.student_id,
        firstName: fourth?.first_name,
        lastName: fourth?.last_name,
        phone: fourth?.phone,
      },
    });

    fetchProvinces();
  }, []);

  useEffect(() => {
    dispatch(loadInternship);
  }, [dispatch]);


  const SelectType = (
    <>
      <div>
        <p className="text-base font-medium leading-none text-gray-800">
          สังกัดภาค
        </p>
        {/*-Dropdown*/}
        <div className="relative top-1 ">
          <div className="relative w-full mt-2 border border-gray-300 rounded outline-none dropdown-one">
            <div
              onClick={showDropDownMenu}
              id="internType"
              onChange={(e) => {
                setInternType(e.target.value);
              }}
              className="relative flex items-center justify-between w-full px-5 py-4 dropbtn-one"
            >
              <span
                className="pr-4 text-sm font-medium text-gray-600"
                id="drop-down-content-setter"
              >
                {internType == "" ? "รัฐบาล" : internType}
              </span>
              <svg
                id="rotate"
                className="absolute z-10 cursor-pointer right-5"
                width={10}
                height={6}
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 0.75L5 5.25L9.5 0.75"
                  stroke="#4B5563"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className="absolute z-20 right-0 hidden w-full px-1 py-2 bg-white border-t border-gray-200 rounded shadow top-12"
              id="drop-down-div"
            >
              <p
                className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded"
                onClick={swaptext}
              >
                เอกชน
              </p>

              <p
                className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded"
                onClick={swaptext}
              >
                รัฐวิสาหกิจ
              </p>

              <p
                className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded"
                onClick={swaptext}
              >
                รัฐบาล
              </p>
            </div>
          </div>
          {/* end */}
        </div>
        {/* end */}
      </div>
    </>
  );

  const SelectAddresses = (
    <>
      {/* // ======================== Addresses API  ======================== */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-7 mt-3 ">
        {/* ===================== Provinces Selection ===================== */}
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            จังหวัด
          </p>
          {/*-Dropdown*/}
          <div className="relative top-1 ">
            <div className="relative w-full mt-2 border border-gray-300 rounded outline-none dropdown-one">
              <div
                onClick={showDropDownMenuProvinces}
                className="relative flex items-center justify-between w-full px-5 py-4 dropbtn-one"
              >
                <span
                  className="pr-4 text-sm font-medium text-gray-600"
                  id="drop-down-provinces-setter"
                >
                  {internProvince == "" ? (
                    <> - กรุณาเลือกจังหวัด - </>
                  ) : (
                    internProvince
                  )}
                </span>
                <svg
                  id="rotate"
                  className="absolute z-10 cursor-pointer right-5"
                  width={10}
                  height={6}
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.5 0.75L5 5.25L9.5 0.75"
                    stroke="#4B5563"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className="overflow-y-auto h-52 absolute z-20 right-0 hidden w-full px-1 py-2 bg-white border-t border-gray-200 rounded shadow top-12"
                id="drop-down-div-provinces"
              >
                {provinces?.map((item) => {
                  {
                    return (
                      <p
                        key={item.id}
                        className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded"
                        onClick={swaptextProvinces}
                      >
                        {item.name_th}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
            {/* end */}
          </div>
          {/* end */}
        </div>

        {/* ===================== districts Selection ===================== */}
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            อำเภอ
          </p>
          {/*-Dropdown*/}
          <div className="relative top-1 ">
            <div className="relative w-full mt-2 border border-gray-300 rounded outline-none dropdown-one">
              <div
                onClick={showDropDownMenuDistricts}
                className="relative flex items-center justify-between w-full px-5 py-4 dropbtn-one"
              >
                <span
                  className="pr-4 text-sm font-medium text-gray-600"
                  id="drop-down-districts-setter"
                >
                  {internDistrict == "" ? (
                    <> - กรุณาเลือกอำเภอ -</>
                  ) : (
                    internDistrict
                  )}
                </span>
                <svg
                  id="rotate"
                  className="absolute z-10 cursor-pointer right-5"
                  width={10}
                  height={6}
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.5 0.75L5 5.25L9.5 0.75"
                    stroke="#4B5563"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className="overflow-y-auto h-52 absolute z-20 right-0 hidden w-full px-1 py-2 bg-white border-t border-gray-200 rounded shadow top-12"
                id="drop-down-div-districts"
              >
                {districts?.map((item) => {
                  {
                    return (
                      <p
                        key={item.id}
                        className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded"
                        onClick={swaptextDistricts}
                      >
                        {item.name_th}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
            {/* end */}
          </div>
          {/* end */}
        </div>

        {/* ===================== sub districts Selection ===================== */}
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            ตำบล
          </p>
          {/*-Dropdown*/}
          <div className="relative top-1 ">
            <div className="relative w-full mt-2 border border-gray-300 rounded outline-none dropdown-one">
              <div
                onClick={showDropDownMenuSubDistricts}
                className="relative flex items-center justify-between w-full px-5 py-4 dropbtn-one"
              >
                <span
                  className="pr-4 text-sm font-medium text-gray-600"
                  id="drop-down-subdistricts-setter"
                >
                  {internSubDistrict == "" ? (
                    <> - กรุณาเลือกตำบล - </>
                  ) : (
                    internSubDistrict
                  )}
                </span>
                <svg
                  id="rotate"
                  className="absolute z-10 cursor-pointer right-5"
                  width={10}
                  height={6}
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.5 0.75L5 5.25L9.5 0.75"
                    stroke="#4B5563"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className="overflow-y-auto h-52 absolute z-20 right-0 hidden w-full px-1 py-2 bg-white border-t border-gray-200 rounded shadow top-12"
                id="drop-down-div-subdistricts"
              >
                {subDistricts?.map((item) => {
                  {
                    return (
                      <p
                        key={item.id}
                        className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded"
                        onClick={swaptextSubDistricts}
                      >
                        {item.name_th}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
            {/* end */}
          </div>
          {/* end */}
        </div>
        {/* ===================== district Selection ===================== */}
      </div>
      {/* // ======================== Addresses API  ======================== */}
    </>
  );

  const Sender = (
    <div>
      {/* =========================== sender intern splace information  =========================== */}
      <div className="mt-2 px-7">
        <p className="text-xl font-semibold leading-tight text-gray-800">
          ข้อมูลผู้เสนอ
        </p>
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
          <div>
            <p className="text-base font-medium leading-none text-gray-800">
              ชื่อ
            </p>
            <input
              className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
              placeholder="ชื่อ-นามสุกล"
              defaultValue={studentFormData.firstName}
              onChange={handleStudentFormChange("firstName")}
              disabled
            />
            <p className="mt-3 text-xs leading-3 text-gray-600"></p>
          </div>
          <div>
            <p className="text-base font-medium leading-none text-gray-800">
              นามสุกล
            </p>
            <input
              className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
              placeholder="ชื่อ-นามสุกล"
              defaultValue={studentFormData.lastName}
              onChange={handleStudentFormChange("lastName")}
              disabled
            />
            <p className="mt-3 text-xs leading-3 text-gray-600"></p>
          </div>
          <div>
            <p className="text-base font-medium leading-none text-gray-800">
              รหัสนักศึกษา
            </p>
            <input
              className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
              placeholder="รหัสนักศึกษา"
              defaultValue={studentFormData.id}
              disabled
              onChange={handleStudentFormChange("id")}
            />
          </div>
          <div>
            <p className="text-base font-medium leading-none text-gray-800">
              เบอร์โทรศัพท์
            </p>
            <input
              className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
              placeholder="เบอร์โทรศัพท์"
              defaultValue={studentFormData.phone}
              onChange={handleStudentFormChange("phone")}
              disabled
            />
          </div>
          <div>
            <p className="text-base font-medium leading-none text-gray-800">
              email
            </p>
            <input
              className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
              placeholder="exsample@gmail.com"
              type="email"
              id="email"
              disabled
              defaultValue={studentFormData.email}
              onChange={handleStudentFormChange("email")}
            />
          </div>
          {/* {SelectProgram} */}
          <div>
            <p className="text-base font-medium leading-none text-gray-800">
              สาขาวิชา
            </p>
            <input
              className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
              placeholder="exsample@gmail.com"
              type="text"
              id="program"
              disabled
              defaultValue={studentFormData.program}
              onChange={handleStudentFormChange("program")}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const InternshipInformation = (
    <div className="mt-10 px-7">
      <p className="text-xl font-semibold leading-tight text-gray-800">
        ข้อมูลสถานที่ฝึกงาน
      </p>
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            ชื่อหน่วยงาน
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="บริษัท โค้ดทูแพนด้า จำกัด"
            defaultValue={internCompanyName}
            onChange={(e) => {
              setInternCompanyName(e.target.value);
            }}
          />
          <p className="mt-3 text-xs leading-3 text-gray-600"></p>
        </div>
        {SelectType}
      </div>

      <div className="grid w-full grid-cols-1 sm2:grid-cols-1 lg:grid-cols-2 md:grid-cols-4 gap-7 mt-7 ">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            กิจกรรมหลักของหน่วยงาน
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="งานที่เกี่ยวข้อง"
            defaultValue={internWork}
            onChange={(e) => {
              setInternWork(e.target.value);
            }}
          />
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            เสนอหนังสือต่อ
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="หัวหน้าฝ่ายบุคคล"
            defaultValue={internProposeTo}
            onChange={(e) => {
              setInternProposeTo(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 sm2:grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-7 mt-7 ">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            ติดต่อสถานที่ฝึกงานกับ
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="ผู้ติดต่อ"
            defaultValue={internContactWithName}
            onChange={(e) => {
              setInternContactWithName(e.target.value);
            }}
          />
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            ตำแหน่ง
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="ตำแหน่ง"
            defaultValue={internContactWithPosition}
            onChange={(e) => {
              setInternContactWithPosition(e.target.value);
            }}
          />
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            เบอร์ติดต่อ
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="เบอร์ติดต่อ"
            defaultValue={internPhone}
            onChange={(e) => {
              setInternPhone(e.target.value);
            }}
          />
        </div>
      </div>
      {SelectAddresses}
      <div className="grid w-full grid-cols-1 lg:grid-cols-3 md:grid-cols-4 gap-7 mt-3 ">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            เลขที่
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="เลขที่"
            defaultValue={internHouseNumber}
            onChange={(e) => {
              setInternHouseNumber(e.target.value);
            }}
          />
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            ถนน / ซอย / หมู่
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="ตำแหน่ง"
            defaultValue={internRoad}
            onChange={(e) => {
              setInternRoad(e.target.value);
            }}
          />
        </div>

        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            รหัสไปรษณีย์
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="รหัสไปรษณีย์"
            defaultValue={internPostCode}
            onChange={(e) => {
              setInternPostCode(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );

  const coInternshipStudents = (
    <div className="mt-10 px-7">
      <p className="text-xl font-semibold leading-tight text-gray-800">
        พร้อมด้วยนักศึกษา
      </p>
      {/* =========================== 1 Person  =========================== */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            1.ชื่อ
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="ชื่อ"
            defaultValue={coStudentFormData?.firstPerson?.firstName}
            onChange={handleCoStudentFormChange("firstPerson", "firstName")}
          />
          <p className="mt-3 text-xs leading-3 text-gray-600"></p>
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            นามสกุล
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="ชื่อ-นามสุกล"
            defaultValue={coStudentFormData?.firstPerson?.lastName}
            onChange={handleCoStudentFormChange("firstPerson", "lastName")}
          />
          <p className="mt-3 text-xs leading-3 text-gray-600"></p>
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            รหัสนักศึกษา 
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="รหัสนักศึกษา"
            defaultValue={coStudentFormData?.firstPerson?.studentId}
            onChange={handleCoStudentFormChange("firstPerson", "studentId")}
          />
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            เบอร์โทรศัพท์
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="เบอร์โทรศัพท์"
            defaultValue={coStudentFormData?.firstPerson?.phone}
            onChange={handleCoStudentFormChange("firstPerson", "phone")}
          />
        </div>
      </div>
      {/* =========================== 2 erson  =========================== */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            2.ชื่อ
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="ชื่อ"
            defaultValue={coStudentFormData?.secondPerson?.firstName}
            onChange={handleCoStudentFormChange("secondPerson", "firstName")}
          />
          <p className="mt-3 text-xs leading-3 text-gray-600"></p>
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            นามสกุล
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="ชื่อ-นามสุกล"
            defaultValue={coStudentFormData?.secondPerson?.lastName}
            onChange={handleCoStudentFormChange("secondPerson", "lastName")}
          />
          <p className="mt-3 text-xs leading-3 text-gray-600"></p>
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            รหัสนักศึกษา 
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="รหัสนักศึกษา"
            defaultValue={coStudentFormData?.secondPerson?.studentId}
            onChange={handleCoStudentFormChange("secondPerson", "studentId")}
          />
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            เบอร์โทรศัพท์
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="เบอร์โทรศัพท์"
            defaultValue={coStudentFormData?.secondPerson?.phone}
            onChange={handleCoStudentFormChange("secondPerson", "phone")}
          />
        </div>
      </div>
      {/* =========================== 3 Person  =========================== */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            3.ชื่อ
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="ชื่อ"
            defaultValue={coStudentFormData?.thirdPerson?.firstName}
            onChange={handleCoStudentFormChange("thirdPerson", "firstName")}
          />
          <p className="mt-3 text-xs leading-3 text-gray-600"></p>
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            นามสกุล
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="ชื่อ-นามสุกล"
            defaultValue={coStudentFormData?.thirdPerson?.lastName}
            onChange={handleCoStudentFormChange("thirdPerson", "lastName")}
          />
          <p className="mt-3 text-xs leading-3 text-gray-600"></p>
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            รหัสนักศึกษา
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="รหัสนักศึกษา"
            defaultValue={coStudentFormData?.thirdPerson?.studentId}
            onChange={handleCoStudentFormChange("thirdPerson", "studentId")}
          />
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            เบอร์โทรศัพท์
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="เบอร์โทรศัพท์"
            defaultValue={coStudentFormData?.thirdPerson?.phone}
            onChange={handleCoStudentFormChange("thirdPerson", "phone")}
          />
        </div>
      </div>
      {/* =========================== 4 Person  =========================== */}
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            4.ชื่อ
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="ชื่อ"
            defaultValue={coStudentFormData?.fourthPerson?.firstName}
            onChange={handleCoStudentFormChange("fourthPerson", "firstName")}
          />
          <p className="mt-3 text-xs leading-3 text-gray-600"></p>
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            นามสกุล
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="ชื่อ-นามสุกล"
            defaultValue={coStudentFormData?.fourthPerson?.lastName}
            onChange={handleCoStudentFormChange("fourthPerson", "lastName")}
          />
          <p className="mt-3 text-xs leading-3 text-gray-600"></p>
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            รหัสนักศึกษา
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="รหัสนักศึกษา"
            defaultValue={coStudentFormData?.fourthPerson?.studentId}
            onChange={handleCoStudentFormChange("fourthPerson", "studentId")}
          />
        </div>
        <div>
          <p className="text-base font-medium leading-none text-gray-800">
            เบอร์โทรศัพท์
          </p>
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
            placeholder="เบอร์โทรศัพท์"
            defaultValue={coStudentFormData?.fourthPerson?.phone}
            onChange={handleCoStudentFormChange("fourthPerson", "phone")}
          />
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className="2xl:px-56 xl:px-48 lg:px-36">
        <div className="flex flex-no-wrap items-center">
          <div className="w-full ">
            <div className="px-2">
              <form onSubmit={(e) => handleFormSave(e)}>
                <div className="bg-white rounded shadow mt-7 py-7">
                  {/* end */}
                  {/* นักศึกษาผู้ส่งข้อมูลแบบฟอร์ม */}
                  {Sender}
                  {/* ข้อมูลสถานที่ฝึกงาน */}
                  {InternshipInformation}
                  {/* นักศึกษาฝึกประสบการร่วม */}
                  {coInternshipStudents}
                  <hr className="h-[1px] bg-gray-100 my-14" />
                  <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                    <button className="btn btn-cancel rounded transform duration-300 ease-in-out text-sm font-medium px-6 py-4 border lg:max-w-[95px]  w-full ">
                      Cancel
                    </button>

                    <button
                      id="submit"
                      type="submit"
                      className="btn btn-sky transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[144px] w-full "
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default InternshipForm;