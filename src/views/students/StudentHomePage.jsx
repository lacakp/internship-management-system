import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const StudentHomePage = () => {
  return (
    <>
      <div className="flex md:flex-row sm0:flex-col sm1:flex-col sm3:flex-row sm3:space-x-10 md:space-x-5 lg:flex-row lg:space-x-16 items-center justify-center min-h-screen">
        <div className="w-64 px-8 py-6 mt-4 text-left bg-white shadow-2xl rounded-3xl">
          <div className="flex justify-center items-center mb-3 mt-3">
            <FontAwesomeIcon className="fill-current h-16 w-16" icon={faUser} />
          </div>
          <h3 className="text-2xl font-bold text-center">การฝึกงาน</h3>
          <div className="mt-4">
            <div className="flex justify-center items-center mb-3 mt-3">
              <button className="w-32 px-6 py-2 mt-4 text-white btn btn-green">
                ส่งแล้ว
              </button>
            </div>
            <div className="flex justify-center items-center mb-3 mt-3">
              <Link to="/student/internship-form">
                <button className="w-32 px-6 py-2  text-white btn btn-sky">
                  ดู
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-64 px-8 py-6 mt-4 text-left bg-white shadow-2xl rounded-3xl">
          <div className="flex justify-center items-center mb-3 mt-3">
            <FontAwesomeIcon className="fill-current h-16 w-16" icon={faEdit} />
            <i className="fas fa-file-user"></i>
          </div>
          <h3 className="text-2xl font-bold text-center">ประวัตินักศึกษา</h3>
          <div className="mt-4">
            <div className="flex justify-center items-center mb-12 mt-12">
              <Link to="/student/resume">
                <button className="w-32 px-6 py-2  text-white btn btn-sky">
                  ดู
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHomePage;
