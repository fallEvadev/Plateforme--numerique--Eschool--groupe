1..10 |ForEach-object{ C:\WINDOWS\system32> New-Item -Path "C:/TP_Fichier\Fichier$_.txt" -ItemType Fil

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----         6/18/2026   6:49 PM                TP_fichiers


PS C:\WINDOWS\system32> 1..10 |ForEach-object {
>>  New-Item -Path "C:/TP_Fichier\Fichier$_.txt" -ItemType File}


    Répertoire : C:\TP_Fichier


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----         6/18/2026   6:51 PM              0 Fichier1.txt
-a----         6/18/2026   6:51 PM              0 Fichier2.txt
-a----         6/18/2026   6:51 PM              0 Fichier3.txt
-a----         6/18/2026   6:51 PM              0 Fichier4.txt
-a----         6/18/2026   6:51 PM              0 Fichier5.txt
-a----         6/18/2026   6:51 PM              0 Fichier6.txt
-a----         6/18/2026   6:51 PM              0 Fichier7.txt
-a----         6/18/2026   6:51 PM              0 Fichier8.txt
-a----         6/18/2026   6:51 PM              0 Fichier9.txt
-a----         6/18/2026   6:51 PM              0 Fichier10.txt


PS C:\WINDOWS\system32>