import React from 'react'

const ReuseForm = ({ onSubmit, headerTxt, titlePlaceholder, descPlaceholder, buttontext, type = "submit", children }) => {
    return (
        <>
            <div className="flex flex-col h-[calc(100vh-4rem)] pt-16 bg-white items-center">
                <p className='py-5 text-3xl'>{headerTxt}</p>

                <div className="px-10 py-10 bg-white border-2 rounded-2xl w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={onSubmit} className="card-body">
                        <fieldset className="fieldset">
                            <label className="fieldset-label">Title</label>
                            <input type="text"
                                id="cat_name"
                                name="title"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={titlePlaceholder} required />

                            <label className="fieldset-label">Description</label>
                            <textarea
                                id="message"
                                rows="4"
                                name="desc"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={descPlaceholder}></textarea>

                            {children}
                            <div className="flex justify-center items-center gap-5 pt-5 mb-3">

                                <div class="flex items-center">
                                    <input
                                        id="default-radio-1"
                                        type="radio"
                                        value="active"
                                        name="status"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Active
                                    </label>
                                </div>
                                <div class="flex items-center">
                                    <input
                                        id="default-radio-2"
                                        type="radio"
                                        value="inactive"
                                        name="status"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inactive</label>
                                </div>
                            </div>

                            <button type={type} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{buttontext}</button>
                        </fieldset>
                    </form>
                </div>

            </div>
        </>
    )
}

export default ReuseForm