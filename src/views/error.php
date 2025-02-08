<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Erro - Sistema de Futebol</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Erro!</h4>
            <p><?php echo htmlspecialchars($error ?? 'Ocorreu um erro inesperado.'); ?></p>
            <hr>
            <p class="mb-0">
                <a href="/" class="btn btn-primary">Voltar para página inicial</a>
            </p>
        </div>
    </div>
</body>
</html>
