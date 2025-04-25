import backButton from '@/assets/back-button.png';
import { Pages } from '@/types';

export const Navbar = ({
  currentPage,
  onBackButtonClick,
}: {
  currentPage: Pages;
  onBackButtonClick: () => void;
}) => {
  const listPageContent = (
    <p className="font-[Jost] font-semibold">TO-DO APP</p>
  );
  const addPageContent = (
    <div className="flex gap-2">
      <img src={backButton} alt="" width={25} onClick={onBackButtonClick} />
      <p className=" font-semibold">Add Task</p>
    </div>
  );
  const editPageContent = (
    <div className="flex gap-2">
      <img src={backButton} alt="" width={25} onClick={onBackButtonClick} />
      <p className=" font-semibold">Edit Task</p>
    </div>
  );
  const currentPageContent =
    currentPage === Pages.LIST
      ? listPageContent
      : currentPage === Pages.ADD
        ? addPageContent
        : editPageContent;
  return (
    <header className="bg-blue-900 text-white px-8 py-4 sm:px-4">
      {currentPageContent}
    </header>
  );
};
