import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

function ShowImage({ post, onClose }) {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className=" w-auto max-w-full h-auto rounded-xl p-32  flex flex-col justify-center items-center "
      >
        <div>
          <img
            className="w-fit h-fit"
            src={`http://localhost:6001/${post.pic}`}
          ></img>
        </div>
        {/* <h4 className="my-2 text-gray-500">{post._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <DescriptionIcon className="text-red-300 text-2xl" />
          <h2 className="my-2"> {post.description}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <AccountBoxIcon className="text-red-300 text-2xl" />
          <h2 className="my-2">
            {" "}
            {post.firstName} {post.lastName}
          </h2>
        </div>
        <p className="mt-4">Anything you want to show</p>
        <p className="my-2">
          Just pretend that there is a lot of text here lads!
        </p> */}
      </div>
      <CloseIcon
          className=" absolute top-2 right-2 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
    </div>
  );
}

export default ShowImage;
