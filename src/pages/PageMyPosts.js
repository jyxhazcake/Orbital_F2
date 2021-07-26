import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import AppShell from "../components/AppShell3rd";
import PostContent from "../components/PostContent";
import { useAuth } from "../contexts/Authcontext";
import { ListItemAvatar, TextField } from "@material-ui/core";
import PendingPosts from "../components/PendingPosts";
import CreatePost from "../components/CreatePost";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const firestore = firebase.firestore();

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function PagePosting() {
  const [showCreate, setShowCreate] = useState(true);
  const [showPending, setShowPending] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [currCreate, setCurrCreate] = useState(true);
  const [currPending, setCurrPending] = useState(false);
  const [currCurrent, setCurrCurrent] = useState(false);

  const clickCreate = () => {
    setShowCreate(true);
    setShowPending(false);
    setShowCurrent(false);

    setCurrCreate(true);
    setCurrPending(false);
    setCurrCurrent(false);
  };
  const clickPending = () => {
    setShowCreate(false);
    setShowPending(true);
    setShowCurrent(false);

    setCurrCreate(false);
    setCurrPending(true);
    setCurrCurrent(false);
  };
  const clickCurrent = () => {
    setShowCreate(false);
    setShowPending(false);
    setShowCurrent(true);

    setCurrCreate(false);
    setCurrPending(false);
    setCurrCurrent(true);
  };
  const navigation = [
    { name: "Create Post", click: clickCreate, current: currCreate },
    { name: "Pending Posts", click: clickPending, current: currPending },
    { name: "Current Posts", click: clickCurrent, current: currCurrent },
  ];

  const { currentUser } = useAuth();

  const postsRef = firestore.collection("posts");
  const postquery = postsRef.orderBy("createdAt", "desc").limit(25);
  const adminRef = firestore.collection("AdminApproval");
  const adminquery = adminRef.orderBy("createdAt", "desc").limit(25);
  const userRef = firestore.collection("Users").doc(currentUser?.uid);

  const [posts] = useCollectionData(postquery, { idField: "id" });
  const [pending] = useCollectionData(adminquery, { idField: "id" });
  const [user] = useDocumentData(userRef);

  const [myposts] = useCollectionData(adminquery, { idField: "id" })?.filter(
    (pst) => {
      return currentUser.uid === pst?.uid;
    }
  );

  return (
    <>
      <AppShell />
      <Disclosure as="nav" className="bg-gray-900 shadow-md">
        {({ open }) => (
          <>
            <div className=" mx-auto px-2 sm:px-4 lg:px-4">
              <div className="relative flex items-center justify-between h-10">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex sm:space-x-2 lg:space-x-6">
                      {navigation.map((item) => (
                        <button
                          key={item.name}
                          onClick={item.click}
                          className={classNames(
                            item.current
                              ? "text-white"
                              : "text-gray-500 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "text-white"
                        : "text-gray-300 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {showCreate && <CreatePost />}

      {showPending && (
        <div>
          <p className="pl-10 font-bold text-sm text-gray-900 pt-6">
            Pending Postings
          </p>
          <div className="flex flex-wrap gap-x-10 pt-5 pl-10 items-center">
            {pending &&
              pending
                .filter((pst) => {
                  return pst.uid === currentUser.uid;
                })
                .map((pdg) => <PendingPosts key={pdg.id} post={pdg} />)}
          </div>
        </div>
      )}
      {showCurrent && (
        <>
          <p className="pl-10 font-bold text-sm text-gray-900 pt-6">
            Current Postings
          </p>
          <div className="flex flex-wrap gap-x-10 pt-5 pl-10 items-center">
            {posts &&
              posts
                .filter((pst) => {
                  return pst.uid === currentUser.uid;
                })
                .map((pst) => <PostContent key={pst.id} post={pst} />)}
          </div>
        </>
      )}
    </>
  );
}

export default PagePosting;
