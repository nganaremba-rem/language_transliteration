import { useCallback, useState } from 'react'
import useFetchTransliteratedTextAndSet from '../hooks/useFetchTransliteratedText'
import useDebounceMutate from '../hooks/useDebounceMutate'
import { languageSupported } from '../utils/languageSupported'
import { v4 } from 'uuid'

function Homepage() {
  const [fromText, setFromText] = useState('')
  const [toText, setToText] = useState('')
  const [fromLanguage, setFromLanguage] = useState('en')
  const [toLanguage, setToLanguage] = useState('mni')
  const [warning, setWarning] = useState('')
  const { mutate } = useFetchTransliteratedTextAndSet(setToText)

  const debounceMutate = useDebounceMutate(mutate, 800)

  const handleFromTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFromText(e.target.value)

      if (e.target.value.trim() === '') {
        setToText('')
        return
      }

      if (fromLanguage === toLanguage) {
        setWarning('Both Language cannot be same')
        return
      }

      setWarning('')

      debounceMutate({
        source: e.target.value,
        targetLanguage: toLanguage,
        sourceLanguage: fromLanguage,
      })
    },
    [debounceMutate, toLanguage, fromLanguage]
  )

  return (
    <div className='flex flex-col gap-5 justify-center items-center p-5 md:p-4'>
      <h1 className='text-3xl text-white font-extrabold p-2'>
        Language Transliteration
      </h1>
      {warning && (
        <div className='text-red-600 font-bold bg-slate-100 p-2 rounded'>
          {warning}
        </div>
      )}
      <div className='flex flex-col md:flex-row gap-5 items-center'>
        <form action=''>
          <div className='flex flex-col gap-4 bg-gradient-to-tl from-sky-600 to-slate-300 shadow-lg px-5 py-2 md:py-5 md:px-10 rounded-3xl'>
            <div className='p-2 flex flex-col gap-2'>
              <label className='font-extrabold' htmlFor='languageFrom '>
                From
              </label>
              <select
                className='p-2 rounded w-full'
                name='languageFrom'
                id='languageFrom'
                onChange={(e) => {
                  if (e.target.value !== toLanguage) setWarning('')
                  if (fromText) {
                    debounceMutate({
                      source: fromText,
                      targetLanguage: toLanguage,
                      sourceLanguage: e.target.value,
                    })
                  }
                  setFromLanguage(e.target.value)
                }}
                value={fromLanguage}
              >
                {languageSupported.map((lng) => (
                  <option key={v4()} value={lng.languageCode}>
                    {lng.language}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <textarea
                className='p-2 rounded-xl bg-slate-100'
                name='languageFromText'
                id='languageFromText'
                cols={30}
                rows={10}
                value={fromText}
                onChange={handleFromTextChange}
              ></textarea>
            </div>
          </div>
        </form>
        <form>
          <div className='flex flex-col gap-4 bg-gradient-to-tr from-rose-400 to-slate-300 shadow-lg px-5 py-2 md:py-5 md:px-10 rounded-3xl'>
            <div className='p-2 flex flex-col gap-2'>
              <label className='font-extrabold' htmlFor='languageTo'>
                To
              </label>
              <select
                className='p-2 rounded w-full'
                name='languageTo'
                id='languageTo'
                value={toLanguage}
                onChange={(e) => {
                  if (e.target.value !== fromLanguage) setWarning('')
                  if (fromText) {
                    debounceMutate({
                      source: fromText,
                      targetLanguage: e.target.value,
                      sourceLanguage: fromLanguage,
                    })
                  }
                  setToLanguage(e.target.value)
                }}
              >
                {languageSupported.map((lng) => (
                  <option key={v4()} value={lng.languageCode}>
                    {lng.language}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <textarea
                className='p-2 rounded-xl bg-slate-100'
                name='languageToText'
                id='languageToText'
                cols={30}
                rows={10}
                value={toText}
                readOnly
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Homepage
