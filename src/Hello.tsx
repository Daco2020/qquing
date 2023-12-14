type helloProps = {
    to: string,
    from?: string
}

export default function Hello(props: helloProps) {
    const { to, from } = props
  return (
    <>
      <h1>Hello {to}, I'm {from}</h1>
    </>
  )
}