# cn1-rich-text-editor

# see sample implementation below

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Code ni Juan Rich Text Editor</title>
	<script type="text/javascript" src="cn1.richtext.js"></script>
</head>
<body>
	<form name="formSample" action="" method="post">
		<textarea id="testTextArea" rows="10" cols="100"></textarea>
	</form>
</body>

<script type="text/javascript">
	CN1SimpleRichText.init(
		{
			selector: 'testTextArea',

			//if true this will enable the forecolor and background color
			color: true,  
			
			// width: '1000px',
			height: '400px'
		}
	);
</script>

</html>